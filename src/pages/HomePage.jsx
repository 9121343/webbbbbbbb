import React, { Suspense, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShoppingBag,
  Zap,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Play,
  Star,
  Clock,
  Shield,
  Truck,
} from "lucide-react";
import { useProductStore, useCartStore } from "../store/useStore";
import ProductCard from "../components/ProductCard";

// Realistic 3D T-Shirt Model
const TShirtModel = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#3a86ff",
}) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* T-Shirt Body */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.4, 2.5, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Sleeves */}
      <mesh position={[-1.6, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 12]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[1.6, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 12]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[0.8, 0.1, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.2} />
      </mesh>
    </group>
  );
};

// Realistic 3D Shoe Model
const ShoeModel = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Sole */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.2, 0.4, 3.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Upper */}
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff006e" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Heel */}
      <mesh position={[0, 0, -1.2]}>
        <boxGeometry args={[2, 1.5, 1]} />
        <meshStandardMaterial color="#8338ec" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Laces */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0.3 + i * 0.2, 0.8 - i * 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 1.8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

// Realistic 3D Watch Model
const WatchModel = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Watch Band */}
      <mesh>
        <torusGeometry args={[1.8, 0.3, 8, 32]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Watch Face */}
      <mesh>
        <cylinderGeometry args={[1, 1, 0.3, 32]} />
        <meshStandardMaterial
          color="#000000"
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.05, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          roughness={0}
          metalness={0}
          transmission={0.9}
        />
      </mesh>

      {/* Crown */}
      <mesh position={[1.1, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
};

// Main 3D Scene
const ProductShowcase = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const products = [
    { component: TShirtModel, name: "Smart Tee", props: { color: "#3a86ff" } },
    { component: ShoeModel, name: "Neo Runners", props: {} },
    { component: WatchModel, name: "Quantum Watch", props: {} },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const CurrentProductComponent = products[currentProduct].component;

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <CurrentProductComponent {...products[currentProduct].props} />

        <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />

        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={1}
        />
      </Suspense>
    </Canvas>
  );
};

const HomePage = () => {
  const { categories } = useProductStore();
  const { getTotalItems } = useCartStore();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Featured products
  const featuredProducts = [
    {
      id: 101,
      name: "Neural Interface Hoodie",
      price: 129.99,
      originalPrice: 159.99,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 342,
      isCustomizable: true,
      category: "men-clothing",
    },
    {
      id: 102,
      name: "Quantum Flex Joggers",
      price: 89.99,
      originalPrice: 119.99,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 186,
      isCustomizable: true,
      category: "men-clothing",
    },
    {
      id: 103,
      name: "Holographic Sports Bra",
      price: 79.99,
      originalPrice: 99.99,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 289,
      isCustomizable: true,
      category: "women-clothing",
    },
    {
      id: 104,
      name: "Cyber Punk Jacket",
      price: 249.99,
      originalPrice: 299.99,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 156,
      isCustomizable: true,
      category: "women-clothing",
    },
  ];

  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Active Creators",
      color: "text-neon-cyan",
    },
    {
      icon: Sparkles,
      number: "1M+",
      label: "Designs Created",
      color: "text-neon-pink",
    },
    {
      icon: Award,
      number: "99.9%",
      label: "Satisfaction Rate",
      color: "text-neon-blue",
    },
    {
      icon: TrendingUp,
      number: "24/7",
      label: "AI Support",
      color: "text-neon-purple",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-100 pt-32">
      {/* Hero Section with 3D Product Showcase */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 rounded-full border border-neon-pink/30">
                <Zap className="w-4 h-4 text-neon-pink" />
                <span className="text-neon-pink font-medium text-sm">
                  Welcome to the Future
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-tight">
                Create Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                  Digital Identity
                </span>
              </h1>

              <p className="text-xl text-white/70 leading-relaxed">
                Step into our neural-powered fashion studio where imagination
                meets reality. Design, customize, and create clothing that
                reflects your unique quantum signature.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/category/men-clothing"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl text-white font-bold text-lg hover:from-neon-purple hover:to-neon-blue transition-all duration-300 shadow-neon"
                  >
                    <Play className="w-5 h-5 mr-3" />
                    Start Creating
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="inline-flex items-center px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-xl font-bold text-lg hover:bg-neon-cyan hover:text-dark-100 transition-all duration-300">
                    <Sparkles className="w-5 h-5 mr-3" />
                    Watch Demo
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right 3D Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="h-96 lg:h-[500px] bg-gradient-to-br from-dark-200/50 to-dark-300/50 rounded-3xl overflow-hidden border border-white/10 shadow-cyber">
                <ProductShowcase />

                {/* Product Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="card-dark p-4 backdrop-blur-md">
                    <h3 className="font-bold text-white mb-2">
                      Featured Product
                    </h3>
                    <p className="text-white/60 text-sm mb-3">
                      Real-time 3D preview with neural customization
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-neon-cyan font-bold">$89.99</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg text-white text-sm font-medium hover:scale-105 transition-transform">
                        Customize Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div
                  className={`text-3xl font-display font-black ${stat.color} mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-white/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              Explore Neural
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">
                {" "}
                Categories
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Dive into specialized fashion realms designed for your quantum
              lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {categories.slice(0, 7).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group block card-dark p-6 text-center h-full relative overflow-hidden"
                >
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                    {category.name}
                  </h3>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-transparent to-dark-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
                Trending
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                  {" "}
                  Designs
                </span>
              </h2>
              <p className="text-xl text-white/70">
                Hot picks from our neural fashion AI
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/category/men-clothing"
                className="hidden md:flex items-center text-neon-cyan hover:text-white font-semibold text-lg group"
              >
                <span>View All</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              Why Choose
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">
                {" "}
                STYLEXX
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Instant Preview",
                description:
                  "See your designs come to life in real-time with our quantum rendering engine.",
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description:
                  "Premium materials and craftsmanship backed by our neural quality control.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description:
                  "Express shipping worldwide with quantum-speed logistics network.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card-dark p-8 text-center group hover:shadow-neon transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 via-neon-purple/20 to-neon-blue/20" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-8">
              Ready to Create Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                Fashion Legacy?
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join thousands of creators who are already designing the future of
              fashion with our neural-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/category/men-clothing"
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl text-white font-bold text-xl hover:from-neon-purple hover:to-neon-blue transition-all duration-300 shadow-neon"
                >
                  <ShoppingBag className="w-6 h-6 mr-3" />
                  Start Your Journey
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
