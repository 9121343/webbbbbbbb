import React, { useState, Suspense, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  useTexture,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Type,
  Image as ImageIcon,
  RotateCcw,
  Save,
  ShoppingCart,
  Download,
  Share2,
  Undo2,
  Redo2,
  Cpu,
  Zap,
  Eye,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "../store/useStore";
import toast from "react-hot-toast";
import * as THREE from "three";

// Ultra-realistic 3D T-Shirt with advanced materials and physics simulation
const UltraRealisticTShirt = ({
  color,
  pattern,
  text,
  textColor,
  textSize,
}) => {
  const meshRef = useRef();
  const fabricRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.08;

      // Subtle fabric movement simulation
      if (fabricRef.current) {
        fabricRef.current.material.displacementScale =
          0.02 + Math.sin(state.clock.elapsedTime * 2) * 0.005;
      }
    }
  });

  // Generate realistic wrinkle pattern
  const generateWrinkleGeometry = () => {
    const geometry = new THREE.CylinderGeometry(1.3, 1.5, 2.8, 32, 16);
    const positions = geometry.attributes.position.array;

    // Add subtle wrinkles and fabric deformation
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Create fabric-like deformation
      const noise =
        (Math.sin(x * 8) + Math.cos(y * 6) + Math.sin(z * 4)) * 0.02;
      positions[i] += noise * 0.5;
      positions[i + 1] += noise * 0.3;
      positions[i + 2] += noise * 0.8;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  };

  return (
    <group ref={meshRef}>
      {/* Main T-Shirt Body with realistic fabric geometry */}
      <mesh ref={fabricRef} castShadow receiveShadow>
        <primitive object={generateWrinkleGeometry()} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.05}
          normalScale={[0.5, 0.5]}
          bumpScale={0.02}
          envMapIntensity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Realistic Sleeves with proper proportions */}
      <mesh position={[-1.7, 0.9, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.45, 0.55, 1.4, 16, 8]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.05}
          normalScale={[0.3, 0.3]}
        />
      </mesh>
      <mesh position={[1.7, 0.9, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.45, 0.55, 1.4, 16, 8]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.05}
          normalScale={[0.3, 0.3]}
        />
      </mesh>

      {/* Detailed Collar with realistic stitching */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <torusGeometry args={[0.9, 0.12, 12, 24]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.95)}
          roughness={0.7}
          metalness={0.02}
        />
      </mesh>

      {/* Collar inner rim */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[0.78, 0.02, 8, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.8)}
          roughness={0.8}
        />
      </mesh>

      {/* Bottom Hem with realistic thickness */}
      <mesh position={[0, -1.4, 0]}>
        <torusGeometry args={[1.5, 0.08, 12, 24]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.9)}
          roughness={0.7}
          metalness={0.02}
        />
      </mesh>

      {/* Sleeve Hems */}
      <mesh position={[-1.7, 0.2, 0]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <torusGeometry args={[0.55, 0.06, 8, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.9)}
          roughness={0.7}
        />
      </mesh>
      <mesh position={[1.7, 0.2, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 6]}>
        <torusGeometry args={[0.55, 0.06, 8, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.9)}
          roughness={0.7}
        />
      </mesh>

      {/* Seam lines for realism */}
      <mesh position={[0, 0, 1.31]}>
        <cylinderGeometry args={[1.3, 1.5, 0.01, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.85)}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Pattern Overlay with better integration */}
      {pattern && pattern !== "none" && (
        <mesh position={[0, 0.2, 1.32]}>
          <planeGeometry args={[2.4, 2.2]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            roughness={0.8}
            metalness={0.1}
            blending={THREE.MultiplyBlending}
          />
        </mesh>
      )}

      {/* Enhanced Text Display with 3D effect */}
      {text && (
        <group position={[0, 0.3, 1.33]} ref={textRef}>
          {/* Text background for contrast */}
          <mesh position={[0, 0, -0.001]}>
            <planeGeometry args={[Math.min(text.length * 0.18, 2.2), 0.5]} />
            <meshStandardMaterial
              color={new THREE.Color(textColor).multiplyScalar(0.2)}
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* Main text */}
          <mesh>
            <planeGeometry args={[Math.min(text.length * 0.15, 2.2), 0.4]} />
            <meshStandardMaterial
              color={textColor}
              transparent
              opacity={0.95}
              emissive={textColor}
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Text glow effect */}
          <mesh position={[0, 0, 0.001]}>
            <planeGeometry args={[Math.min(text.length * 0.17, 2.3), 0.45]} />
            <meshStandardMaterial
              color={textColor}
              transparent
              opacity={0.2}
              emissive={textColor}
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      )}

      {/* Fabric micro-details */}
      <mesh position={[0, 0, 1.305]}>
        <planeGeometry args={[2.6, 2.8]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={1}
          normalScale={[0.1, 0.1]}
          bumpScale={0.005}
        />
      </mesh>

      {/* Subtle fabric shine highlights */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2.4,
            (Math.random() - 0.5) * 2.4 + 0.2,
            1.34,
          ]}
        >
          <planeGeometry args={[0.02, 0.1]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
};

const CustomizePage = () => {
  const { productId } = useParams();
  const { addItem } = useCartStore();

  const [selectedColor, setSelectedColor] = useState("#3a86ff");
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [customText, setCustomText] = useState("STYLEXX");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textSize, setTextSize] = useState(18);
  const [activeTab, setActiveTab] = useState("color");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const colors = [
    "#3a86ff",
    "#8338ec",
    "#ff006e",
    "#06ffa5",
    "#ffbe0b",
    "#fb5607",
    "#8ecae6",
    "#219ebc",
    "#023047",
    "#ffffff",
    "#000000",
    "#6c757d",
  ];

  const patterns = [
    { id: "none", name: "None", preview: null },
    { id: "quantum", name: "Quantum Grid", preview: "⬢⬢⬢" },
    { id: "neural", name: "Neural Net", preview: "🧠🔗" },
    { id: "matrix", name: "Digital Matrix", preview: "⚡💫" },
    { id: "hologram", name: "Holographic", preview: "🌈✨" },
    { id: "cyber", name: "Cyber Lines", preview: "〉〉〉" },
  ];

  const product = {
    id: productId,
    name: "Quantum Custom Design",
    basePrice: 89.99,
    customizationFee: 25.0,
  };

  const totalPrice = product.basePrice + product.customizationFee;

  const handleSaveDesign = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Design saved to quantum vault!", {
        style: {
          background: "linear-gradient(45deg, #06ffa5, #3a86ff)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
        },
      });
    }, 1500);
  };

  const handleAddToCart = () => {
    setIsProcessing(true);
    setShowBubble(true);

    setTimeout(() => {
      const customProduct = {
        ...product,
        name: `${product.name} (Neural Custom)`,
        price: totalPrice,
        customization: {
          color: selectedColor,
          pattern: selectedPattern,
          text: customText,
          textColor,
          textSize,
        },
      };
      addItem(customProduct);
      setIsProcessing(false);
      setShowBubble(false);

      toast.success("Quantum design added to cart!", {
        style: {
          background: "linear-gradient(45deg, #ff006e, #8338ec)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
        },
      });
    }, 1000);
  };

  const resetDesign = () => {
    setSelectedColor("#3a86ff");
    setSelectedPattern(null);
    setCustomText("STYLEXX");
    setTextColor("#ffffff");
    setTextSize(18);
    toast.success("Design reset to quantum state!");
  };

  return (
    <div className="min-h-screen bg-dark-100 relative overflow-hidden pt-32">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 bg-mesh animate-gradient-xy opacity-20" />
      <div className="fixed inset-0 cyber-grid opacity-10" />

      {/* Dynamic Floating Orbs */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
            width: Math.random() * 120 + 60,
            height: Math.random() * 120 + 60,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(3px)",
          }}
          animate={{
            x: [0, Math.random() * 300 - 150],
            y: [0, Math.random() * 300 - 150],
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Enhanced Header */}
      <motion.div
        className="bg-dark-100/90 backdrop-blur-xl border-b border-neon-pink/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <Link
                to={`/product/${productId}`}
                className="text-white/80 hover:text-neon-cyan transition-colors duration-300 flex items-center space-x-2"
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  ← Back to Product
                </motion.div>
              </Link>
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Cpu className="w-5 h-5 text-white" />
                </motion.div>
                <h1 className="text-2xl lg:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                  QUANTUM DESIGNER
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-dark-200/50 border border-white/20 rounded-xl text-white/80 hover:text-neon-cyan transition-colors duration-300"
              >
                <Undo2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-dark-200/50 border border-white/20 rounded-xl text-white/80 hover:text-neon-cyan transition-colors duration-300"
              >
                <Redo2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleSaveDesign}
                disabled={isProcessing}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-5 h-5" />
                <span className="hidden sm:inline">Save to Vault</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced 3D Viewer */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card-dark relative overflow-hidden">
              <div className="h-96 lg:h-[600px] relative">
                {/* Processing Overlay */}
                <AnimatePresence>
                  {isProcessing && (
                    <motion.div
                      className="absolute inset-0 bg-dark-100/80 backdrop-blur-sm z-10 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="w-20 h-20 border-4 border-neon-cyan border-t-transparent rounded-full mx-auto mb-4"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <p className="text-neon-cyan font-semibold">
                          Processing Quantum Data...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />

                    {/* Enhanced Lighting Setup */}
                    <ambientLight intensity={0.4} />
                    <directionalLight
                      position={[10, 10, 5]}
                      intensity={1.2}
                      castShadow
                      shadow-mapSize-width={2048}
                      shadow-mapSize-height={2048}
                    />
                    <pointLight
                      position={[-10, -10, -5]}
                      intensity={0.6}
                      color="#8338ec"
                    />
                    <pointLight
                      position={[0, 10, 0]}
                      color="#3a86ff"
                      intensity={0.8}
                    />
                    <spotLight
                      position={[5, 5, 5]}
                      angle={0.3}
                      intensity={0.8}
                      color="#ff006e"
                      castShadow
                    />

                    <UltraRealisticTShirt
                      color={selectedColor}
                      pattern={selectedPattern}
                      text={customText}
                      textColor={textColor}
                      textSize={textSize}
                    />

                    <ContactShadows
                      opacity={0.7}
                      scale={10}
                      blur={2}
                      far={10}
                      resolution={512}
                      color="#000000"
                    />

                    <Environment preset="studio" />
                    <OrbitControls
                      enablePan={false}
                      maxDistance={8}
                      minDistance={3}
                      maxPolarAngle={Math.PI / 1.8}
                      minPolarAngle={Math.PI / 6}
                      enableDamping
                      dampingFactor={0.05}
                    />
                  </Suspense>
                </Canvas>
              </div>

              {/* Enhanced 3D Controls Bar */}
              <div className="p-4 bg-dark-200/50 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-white/60 gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Ultra-Realistic View</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-neon-cyan" />
                      <span>Quantum Physics</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-neon-pink" />
                      <span>Real-time Fabric</span>
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      className="hover:text-neon-cyan transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="hover:text-neon-pink transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Customization Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Neural Tabs */}
            <div className="card-dark">
              <div className="border-b border-white/10">
                <nav className="flex">
                  {[
                    { id: "color", name: "Spectrum", icon: Palette },
                    { id: "text", name: "Neural Text", icon: Type },
                    { id: "patterns", name: "Quantum Mesh", icon: Layers },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center py-4 px-2 lg:px-4 text-sm font-medium transition-all duration-300 ${
                          activeTab === tab.id
                            ? "border-b-2 border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                        <span className="text-xs lg:text-sm">{tab.name}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 lg:p-6">
                <AnimatePresence mode="wait">
                  {/* Color Tab */}
                  {activeTab === "color" && (
                    <motion.div
                      key="color"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-neon-cyan" />
                          Quantum Spectrum
                        </h3>
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                          {colors.map((color, index) => (
                            <motion.button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                                selectedColor === color
                                  ? "border-white shadow-neon scale-110"
                                  : "border-white/20 hover:border-white/40 hover:scale-105"
                              }`}
                              style={{ backgroundColor: color }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{
                                opacity: 1,
                                scale: selectedColor === color ? 1.1 : 1,
                              }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {selectedColor === color && (
                                <motion.div
                                  className="absolute inset-0 bg-white/20 rounded-xl"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Text Tab */}
                  {activeTab === "text" && (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Neural Message
                        </label>
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          placeholder="Enter quantum text..."
                          className="input-field"
                          maxLength={20}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Text Intensity: {textSize}px
                        </label>
                        <input
                          type="range"
                          min="12"
                          max="28"
                          value={textSize}
                          onChange={(e) =>
                            setTextSize(parseInt(e.target.value))
                          }
                          className="w-full accent-neon-cyan"
                        />
                        <div className="flex justify-between text-xs text-white/40 mt-1">
                          <span>Subtle</span>
                          <span>Bold</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Text Spectrum
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {colors.slice(0, 8).map((color) => (
                            <motion.button
                              key={color}
                              onClick={() => setTextColor(color)}
                              className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-2 transition-all duration-300 ${
                                textColor === color
                                  ? "border-white shadow-neon scale-110"
                                  : "border-white/20 hover:border-white/40"
                              }`}
                              style={{ backgroundColor: color }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Patterns Tab */}
                  {activeTab === "patterns" && (
                    <motion.div
                      key="patterns"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Quantum Mesh Patterns
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {patterns.map((pattern, index) => (
                          <motion.button
                            key={pattern.id}
                            onClick={() =>
                              setSelectedPattern(
                                pattern.id === "none" ? null : pattern.id,
                              )
                            }
                            className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                              selectedPattern === pattern.id ||
                              (selectedPattern === null &&
                                pattern.id === "none")
                                ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                                : "border-white/20 text-white/80 hover:border-white/40"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="text-xl mb-2">
                              {pattern.preview}
                            </div>
                            <div className="text-sm font-medium">
                              {pattern.name}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Enhanced Neural Pricing */}
            <div className="card-dark p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-neon-pink" />
                Quantum Pricing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-white/80">
                  <span>Base Neural Core:</span>
                  <span>${product.basePrice}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Quantum Enhancement:</span>
                  <span>${product.customizationFee}</span>
                </div>
                <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-lg">
                  <span className="text-neon-cyan">Total Quantum Cost:</span>
                  <span className="text-neon-cyan">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isProcessing}
                  className="w-full btn-primary py-4 flex items-center justify-center space-x-3 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>Deploy to Cart</span>
                  <Zap className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.button>

                <motion.button
                  onClick={resetDesign}
                  className="w-full btn-secondary py-4 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset Quantum State</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
