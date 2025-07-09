import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../store/useStore";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="card group relative">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Product Image</span>
            </div>
          </div>
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>

        {/* Customizable Badge */}
        {product.isCustomizable && (
          <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Palette className="w-3 h-3 mr-1" />
            Customizable
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100,
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary text-sm py-2"
          >
            Add to Cart
          </button>
          {product.isCustomizable && (
            <Link
              to={`/customize/${product.id}`}
              className="flex-1 btn-secondary text-sm py-2 text-center"
            >
              Customize
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
