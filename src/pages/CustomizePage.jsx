import React, { useState, Suspense, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
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

// Realistic 3D T-Shirt Component
const RealisticTShirt = ({ color, pattern, text, textColor, textSize }) => {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main T-Shirt Body with realistic shape */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.5, 2.8, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Left Sleeve */}
      <mesh position={[-1.7, 0.9, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.45, 0.55, 1.4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Right Sleeve */}
      <mesh position={[1.7, 0.9, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.45, 0.55, 1.4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <torusGeometry args={[0.9, 0.12, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Bottom Hem */}
      <mesh position={[0, -1.4, 0]}>
        <torusGeometry args={[1.5, 0.08, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Sleeve Hems */}
      <mesh position={[-1.7, 0.2, 0]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <torusGeometry args={[0.55, 0.06, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[1.7, 0.2, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 6]}>
        <torusGeometry args={[0.55, 0.06, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Pattern Overlay */}
      {pattern && pattern !== "none" && (
        <mesh position={[0, 0.2, 1.31]}>
          <planeGeometry args={[2.4, 2.2]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      )}

      {/* Text Display */}
      {text && (
        <group position={[0, 0.3, 1.32]} ref={textRef}>
          <mesh>
            <planeGeometry args={[Math.min(text.length * 0.15, 2.2), 0.4]} />
            <meshStandardMaterial
              color={textColor}
              transparent
              opacity={0.9}
              emissive={textColor}
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      )}

      {/* Fabric Texture Enhancement */}
      <mesh position={[0, 0, 1.3]}>
        <planeGeometry args={[2.6, 2.8]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          roughness={0.8}
          normalScale={[0.1, 0.1]}
        />
      </mesh>
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
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh animate-gradient-xy opacity-20" />
      <div className="fixed inset-0 cyber-grid opacity-10" />

      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(2px)",
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        className="bg-dark-100/80 backdrop-blur-xl border-b border-neon-pink/30"
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
          {/* 3D Viewer */}
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

                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.6} />
                    <directionalLight
                      position={[10, 10, 5]}
                      intensity={1}
                      castShadow
                    />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} />
                    <pointLight
                      position={[0, 10, 0]}
                      color="#3a86ff"
                      intensity={0.8}
                    />

                    <RealisticTShirt
                      color={selectedColor}
                      pattern={selectedPattern}
                      text={customText}
                      textColor={textColor}
                      textSize={textSize}
                    />

                    <ContactShadows
                      opacity={0.6}
                      scale={8}
                      blur={1}
                      far={10}
                      resolution={256}
                      color="#000000"
                    />

                    <Environment preset="city" />
                    <OrbitControls
                      enablePan={false}
                      maxDistance={8}
                      minDistance={3}
                      maxPolarAngle={Math.PI / 1.8}
                      minPolarAngle={Math.PI / 6}
                    />
                  </Suspense>
                </Canvas>

                {/* Real-time Text Overlay */}
                {customText && (
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      left: "50%",
                      top: "45%",
                      transform: "translate(-50%, -50%)",
                      fontSize: `${Math.max(textSize * 0.8, 14)}px`,
                      color: textColor,
                      fontFamily: "Orbitron, monospace",
                      fontWeight: "bold",
                      textShadow: `0 0 10px ${textColor}40, 0 0 20px ${textColor}20`,
                      zIndex: 5,
                    }}
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {customText}
                  </motion.div>
                )}
              </div>

              {/* 3D Controls Bar */}
              <div className="p-4 bg-dark-200/50 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-white/60 gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Neural Vision Active</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-neon-cyan" />
                      <span>Quantum Rendering</span>
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

          {/* Customization Panel */}
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
                              className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl border-2 transition-all duration-300 ${
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
                            />
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
                              className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg border-2 ${
                                textColor === color
                                  ? "border-white"
                                  : "border-white/20"
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
                        {patterns.map((pattern) => (
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

            {/* Neural Pricing */}
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
