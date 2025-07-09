import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock search results
  const mockResults = [
    {
      id: 1,
      name: "Custom T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 124,
      isCustomizable: true,
      category: "men-clothing",
    },
    {
      id: 2,
      name: "Designer Sneakers",
      price: 89.99,
      originalPrice: 119.99,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 89,
      isCustomizable: true,
      category: "shoes",
    },
  ];

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(
        mockResults.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-3 pl-12 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-4 py-1.5 rounded text-sm hover:bg-primary-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-gray-600">{results.length} products found</p>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try searching with different keywords or browse our
                    categories
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
