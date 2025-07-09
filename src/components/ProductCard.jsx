import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Palette, ShoppingCart, Zap, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useStore";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: "linear-gradient(45deg, #ff006e, #8338ec)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "12px",
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(
      `${product.name} ${isLiked ? "removed from" : "added to"} wishlist!`,
      {
        style: {
          background: "linear-gradient(45deg, #3a86ff, #06ffa5)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
        },
      },
    );
  };

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-3xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500" />

      <div className="relative card-dark overflow-hidden">
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
          <Link to={`/product/${product.id}`}>
            {/* Holographic Background */}
            <div className="absolute inset-0 holographic opacity-20" />

            {/* Placeholder Image with Gradient */}
            <div className="w-full h-full bg-gradient-to-br from-neon-blue/30 via-neon-purple/30 to-neon-pink/30 flex items-center justify-center relative overflow-hidden">
              {/* Animated Grid Pattern */}
              <div className="absolute inset-0 cyber-grid opacity-30" />

              {/* Product Type Icon */}
              <motion.div
                className="relative z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-2xl flex items-center justify-center shadow-neon-blue">
                  <Palette className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent h-8"
                animate={{ y: ["-100%", "400%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
              />
            </div>
          </Link>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-3 bg-dark-100/80 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? "liked" : "unliked"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isLiked
                      ? "text-neon-pink fill-current"
                      : "text-white/60 hover:text-neon-pink"
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Customizable Badge */}
          {product.isCustomizable && (
            <motion.div
              className="absolute top-4 left-4 bg-gradient-to-r from-neon-pink to-neon-purple text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-neon"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Palette className="w-3 h-3" />
              <span>3D CUSTOM</span>
            </motion.div>
          )}

          {/* Discount Badge */}
          {product.originalPrice > product.price && (
            <motion.div
              className="absolute bottom-4 left-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-white px-3 py-2 rounded-xl text-xs font-bold shadow-neon-blue"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )}
              % OFF
            </motion.div>
          )}

          {/* Quick Actions Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-dark-100/50 backdrop-blur-sm flex items-center justify-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={handleAddToCart}
                  className="p-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full text-white shadow-neon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="p-3 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full text-white shadow-neon-blue"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          <Link to={`/product/${product.id}`} className="block">
            <motion.h3
              className="font-bold text-white text-lg group-hover:text-neon-cyan transition-colors duration-300 line-clamp-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {product.name}
            </motion.h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-neon-yellow fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-white/60">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.span
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue"
                whileHover={{ scale: 1.05 }}
              >
                ${product.price}
              </motion.span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-white/40 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Neural Link Indicator */}
            <motion.div
              className="flex items-center space-x-1 text-neon-pink text-xs"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-3 h-3" />
              <span>LIVE</span>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.button
              onClick={handleAddToCart}
              className="btn-primary text-sm py-3 px-4 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </motion.button>

            {product.isCustomizable && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/customize/${product.id}`}
                  className="btn-secondary text-sm py-3 px-4 text-center flex items-center justify-center space-x-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Customize</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Holographic Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;
