import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  Sphere,
  MeshDistortMaterial,
  Stars,
  Text3D,
} from "@react-three/drei";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Eye,
  Cpu,
  Sparkles,
  Lock,
  User,
  Mail,
} from "lucide-react";
import { useUserStore } from "../store/useStore";
import { useState } from "react";

// 3D Logo Component
const QuantumLogo = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef}>
        {/* Main Sphere */}
        <Sphere args={[1.5, 32, 32]}>
          <MeshDistortMaterial
            color="#ff006e"
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>

        {/* Outer Ring */}
        <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#8338ec"
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>

        {/* Inner Core */}
        <Sphere args={[0.8, 16, 16]}>
          <meshStandardMaterial
            color="#3a86ff"
            emissive="#3a86ff"
            emissiveIntensity={0.5}
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
      <pointLight position={[10, 10, 10]} color="#ff006e" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#8338ec" intensity={2} />
      <pointLight position={[0, 10, 0]} color="#3a86ff" intensity={1.5} />
      <QuantumLogo />
      <Stars
        radius={300}
        depth={60}
        count={2000}
        factor={10}
        saturation={0}
        fade
      />
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Suspense>
  </Canvas>
);

const LoginPage = () => {
  const { login } = useUserStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      login({
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-dark-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh animate-gradient-xy opacity-30" />
      <div className="fixed inset-0 cyber-grid opacity-10" />

      {/* Floating Quantum Orbs */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${["#ff006e", "#8338ec", "#3a86ff", "#06ffa5", "#ffbe0b"][i % 5]} 0%, transparent 70%)`,
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(3px)",
          }}
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - 3D Scene & Branding */}
        <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16">
          {/* 3D Scene */}
          <div className="w-full max-w-2xl h-64 sm:h-80 lg:h-96 mb-6 lg:mb-8">
            <Scene3D />
          </div>

          {/* Main Branding */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue leading-tight"
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
              className="flex items-center justify-center space-x-2 sm:space-x-4 text-lg sm:text-xl md:text-2xl font-bold text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan animate-pulse" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                THE FUTURE OF FASHION
              </span>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan animate-pulse" />
            </motion.div>

            <motion.p
              className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl leading-relaxed px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Enter the quantum realm of personalized fashion. Design in
              real-time 3D, powered by neural networks. Your style, reimagined
              beyond reality.
            </motion.p>

            {/* Features Preview */}
            <motion.div
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[
                { icon: Cpu, text: "Neural Engine" },
                { icon: Zap, text: "Quantum Speed" },
                { icon: Eye, text: "3D Reality" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl flex items-center justify-center mx-auto mb-2 shadow-neon">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <p className="text-white/60 text-xs sm:text-sm font-medium">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Authentication Portal */}
        <div className="w-full lg:w-96 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="card-dark p-8 relative overflow-hidden">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-neon-purple/10 to-neon-blue/10" />

              <div className="relative z-10">
                {/* Portal Header */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-neon-blue"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Lock className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">
                    {isSignUp ? "Join the Matrix" : "Enter Portal"}
                  </h2>
                  <p className="text-white/60">
                    {isSignUp
                      ? "Create your quantum identity"
                      : "Access the neural network"}
                  </p>
                </div>

                {/* Authentication Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Neural Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your identity..."
                          className="input-field pl-12"
                          required={isSignUp}
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Quantum Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="neural@stylexx.com"
                        className="input-field pl-12"
                        required
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Access Code
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="input-field pl-12"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-4 flex items-center justify-center space-x-3 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {isSignUp ? "Initialize Matrix" : "Enter STYLEXX"}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Toggle Auth Mode */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-neon-cyan hover:text-white transition-colors duration-300 text-sm"
                  >
                    {isSignUp
                      ? "Already have access? Sign In"
                      : "Need quantum access? Create Account"}
                  </button>
                </div>

                {/* Neural Status */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>Neural Status:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                      <span>ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Holographic Border Effect */}
              <div
                className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-2xl opacity-30"
                style={{
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
