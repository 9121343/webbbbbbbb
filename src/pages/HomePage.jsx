import React, { Suspense, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Text3D,
  Float,
  Sphere,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Star,
  Palette,
  Zap,
  Shield,
  Sparkles,
  Rocket,
  Cpu,
  Eye,
} from "lucide-react";
import { useProductStore } from "../store/useStore";
import ProductCard from "../components/ProductCard";

// 3D Components
const FloatingLogo = () => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial
            color="#ff006e"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.4}
          />
        </Sphere>
        <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#8338ec"
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>
      </group>
    </Float>
  );
};

const Scene3D = () => (
  <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#ff006e" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8338ec" intensity={1} />
      <FloatingLogo />
      <Stars
        radius={300}
        depth={60}
        count={1000}
        factor={7}
        saturation={0}
        fade
      />
      <Environment preset="night" />
    </Suspense>
  </Canvas>
);

const HomePage = () => {
  const { categories } = useProductStore();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Quantum Mesh T-Shirt",
      price: 89.99,
      originalPrice: 129.99,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 342,
      isCustomizable: true,
      category: "men-clothing",
    },
    {
      id: 2,
      name: "Holographic Runners",
      price: 199.99,
      originalPrice: 299.99,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 186,
      isCustomizable: true,
      category: "shoes",
    },
    {
      id: 3,
      name: "Neural Link Watch",
      price: 499.99,
      originalPrice: 699.99,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 89,
      isCustomizable: false,
      category: "watches",
    },
    {
      id: 4,
      name: "Cyber Dress Matrix",
      price: 149.99,
      originalPrice: 219.99,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 234,
      isCustomizable: true,
      category: "women-clothing",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-100 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh animate-gradient-xy opacity-30"></div>
      <div className="fixed inset-0 cyber-grid opacity-10"></div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${["#ff006e", "#8338ec", "#3a86ff", "#06ffa5"][i % 4]} 0%, transparent 70%)`,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(2px)",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32">
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div className="space-y-4" style={{ y: y1 }}>
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue leading-tight"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                STYLEXX
              </motion.h1>

              <motion.div
                className="flex items-center justify-center space-x-4 text-xl md:text-2xl font-bold text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles className="w-8 h-8 text-neon-cyan animate-pulse" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                  THE FUTURE OF FASHION
                </span>
                <Sparkles className="w-8 h-8 text-neon-cyan animate-pulse" />
              </motion.div>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Enter the quantum realm of personalized fashion. Design in
              <span className="text-neon-pink font-bold"> real-time 3D</span>,
              powered by AI, enhanced by
              <span className="text-neon-blue font-bold"> neural networks</span>
              . Your style, reimagined.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/category/men-clothing"
                  className="btn-neon px-8 py-4 text-lg font-bold flex items-center space-x-3 group"
                >
                  <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                  <span>Launch Creator</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/category/women-clothing"
                  className="btn-primary px-8 py-4 text-lg font-bold flex items-center space-x-3"
                >
                  <Eye className="w-6 h-6" />
                  <span>Explore Matrix</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[
                { number: "10M+", label: "Designs Created" },
                { number: "99.9%", label: "Satisfaction Rate" },
                { number: "24/7", label: "AI Assistant" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl md:text-4xl font-display font-black text-neon-cyan">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-neon-pink rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: y2 }}
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan mb-6">
              Quantum Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience next-generation technology that transforms how you
              create and customize fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Neural 3D Engine",
                description:
                  "AI-powered 3D rendering with quantum precision. Design in real-time with neural network assistance.",
                color: "from-neon-pink to-neon-purple",
              },
              {
                icon: Zap,
                title: "Hyperspeed Performance",
                description:
                  "Blazing fast customization powered by quantum computing. No lag, just pure creative flow.",
                color: "from-neon-blue to-neon-cyan",
              },
              {
                icon: Shield,
                title: "Quantum Security",
                description:
                  "Your designs protected by quantum encryption. Military-grade security for your creative assets.",
                color: "from-neon-purple to-neon-blue",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="card-dark p-8 h-full relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-neon`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-neon-cyan/50 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple mb-6">
              Fashion Realms
            </h2>
            <p className="text-xl text-white/70">
              Explore infinite dimensions of style and creativity
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  transition: { duration: 0.3 },
                }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group block relative"
                >
                  <div className="card-dark p-6 text-center h-full relative overflow-hidden">
                    <motion.div
                      className="text-5xl mb-4"
                      whileHover={{
                        scale: 1.3,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="font-bold text-white group-hover:text-neon-cyan transition-colors duration-300 text-sm">
                      {category.name}
                    </h3>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-pink/50 rounded-2xl transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-20">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue mb-4">
                Quantum Collection
              </h2>
              <p className="text-xl text-white/70">
                Handpicked designs from the metaverse
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/category/men-clothing"
                className="hidden md:flex items-center text-neon-cyan hover:text-white font-semibold text-lg group"
              >
                <span>View All Realms</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-gradient-xy opacity-40" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-cyan mb-8"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Ready to Transcend?
            </motion.h2>

            <p className="text-2xl text-white/80 mb-12 leading-relaxed">
              Join the revolution. Design beyond reality.
              <br />
              <span className="text-neon-cyan font-bold">
                Create the impossible.
              </span>
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/category/men-clothing"
                className="inline-flex items-center bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-neon transition-all duration-300 group"
              >
                <Rocket className="mr-4 w-8 h-8 group-hover:animate-bounce" />
                Enter the Matrix
                <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
