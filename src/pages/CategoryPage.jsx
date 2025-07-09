import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useStore";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categories } = useProductStore();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find((cat) => cat.id === categoryId);

  // Sample products for the category
  const [products] = useState([
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 124,
      isCustomizable: true,
      category: categoryId,
    },
    {
      id: 2,
      name: "Classic Polo Shirt",
      price: 45.99,
      originalPrice: 59.99,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 89,
      isCustomizable: true,
      category: categoryId,
    },
    {
      id: 3,
      name: "Casual Button-up",
      price: 69.99,
      originalPrice: 89.99,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 156,
      isCustomizable: true,
      category: categoryId,
    },
    {
      id: 4,
      name: "Designer Hoodie",
      price: 79.99,
      originalPrice: 99.99,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 203,
      isCustomizable: true,
      category: categoryId,
    },
    {
      id: 5,
      name: "Athletic Tank Top",
      price: 24.99,
      originalPrice: 34.99,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 78,
      isCustomizable: true,
      category: categoryId,
    },
    {
      id: 6,
      name: "Vintage Graphic Tee",
      price: 34.99,
      originalPrice: 44.99,
      image: "/api/placeholder/300/300",
      rating: 4.4,
      reviews: 112,
      isCustomizable: true,
      category: categoryId,
    },
  ]);

  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1],
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <span className="text-4xl mr-3">{category?.icon}</span>
                {category?.name || "Category"}
              </h1>
              <p className="text-gray-600 mt-2">
                Discover and customize {sortedProducts.length} amazing products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="border border-gray-300 rounded px-3 py-2 text-sm hover:border-primary-500 hover:text-primary-600"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Color</h4>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "#000000",
                    "#ffffff",
                    "#ef4444",
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#8b5cf6",
                    "#ec4899",
                  ].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium mb-3">Features</h4>
                <div className="space-y-2">
                  {[
                    "Customizable",
                    "New Arrivals",
                    "On Sale",
                    "Premium Quality",
                  ].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input type="checkbox" className="rounded mr-2" />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center text-gray-600 hover:text-gray-900"
                >
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </button>
                <span className="text-gray-600">
                  {sortedProducts.length} products found
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-auto"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-primary-600 text-white" : "text-gray-600"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary-600 text-white" : "text-gray-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn-primary px-8 py-3">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
