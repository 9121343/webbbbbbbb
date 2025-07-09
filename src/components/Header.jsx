import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Zap,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, useUserStore, useProductStore } from "../store/useStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const { getTotalItems } = useCartStore();
  const { isAuthenticated, user, logout } = useUserStore();
  const { categories } = useProductStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark-100/95 backdrop-blur-xl border-b border-neon-pink/30 shadow-cyber"
            : "bg-dark-100/80 backdrop-blur-md"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Top Banner */}
        <motion.div
          className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue text-white text-center py-2 text-sm font-medium animate-gradient-x overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="inline-flex items-center space-x-2"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">
              ⚡ Revolutionary 3D Customization • Free Shipping Worldwide •
              AI-Powered Designs ⚡
            </span>
            <span className="sm:hidden">
              ⚡ Free Shipping • AI-Powered Designs ⚡
            </span>
            <Zap className="w-4 h-4" />
          </motion.span>
        </motion.div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 z-50"
            >
              <Link
                to="/home"
                className="flex items-center space-x-2 lg:space-x-3 group"
              >
                <motion.div
                  className="relative"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl lg:rounded-2xl flex items-center justify-center shadow-neon">
                    <span className="text-white font-display font-black text-lg lg:text-xl">
                      S
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-neon"></div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl lg:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple group-hover:from-neon-blue group-hover:to-neon-cyan transition-all duration-300">
                    STYLEXX
                  </span>
                  <span className="text-xs text-gray-400 font-medium tracking-wider hidden lg:block">
                    3D FASHION REALM
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Search Bar - Desktop */}
            <motion.form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-lg mx-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative w-full group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for futuristic styles..."
                  className="w-full px-6 py-3 pl-14 pr-16 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent transition-all duration-300 group-hover:bg-white/20"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-neon-pink to-neon-purple text-white px-4 py-1.5 rounded-xl text-sm font-medium hover:from-neon-purple hover:to-neon-blue transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </div>
            </motion.form>

            {/* Right Section */}
            <div className="flex items-center space-x-3 lg:space-x-6">
              {/* Wishlist - Desktop */}
              <motion.button
                className="hidden lg:block relative p-3 text-white/80 hover:text-neon-pink transition-colors duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-6 h-6 group-hover:fill-current transition-all duration-300" />
                <div className="absolute inset-0 bg-neon-pink/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </motion.button>

              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                id="cart-icon"
              >
                <Link
                  to="/cart"
                  className="relative p-2 lg:p-3 text-white/80 hover:text-neon-blue transition-colors duration-300 group"
                >
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                  <AnimatePresence>
                    {getTotalItems() > 0 && (
                      <motion.span
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-neon-pink to-neon-purple text-white text-xs rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center font-bold shadow-neon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        {getTotalItems()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-neon-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </Link>
              </motion.div>

              {/* User Account with Dropdown */}
              <div className="relative user-menu-container">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 lg:space-x-3 text-white/80 hover:text-neon-cyan transition-colors duration-300 group p-2 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <User className="w-5 h-5 lg:w-6 lg:h-6" />
                    <div className="absolute inset-0 bg-neon-cyan/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                  <span className="hidden sm:block text-sm font-medium truncate max-w-24 lg:max-w-none">
                    {user?.name || "Neural User"}
                  </span>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 card-dark border border-white/20 rounded-xl overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-white font-medium truncate">
                          {user?.name}
                        </p>
                        <p className="text-white/60 text-sm truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-300"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Exit Portal
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-neon-pink transition-colors duration-300 z-50 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Desktop Navigation Menu with Sliding Hover Effect */}
          <motion.nav
            className="hidden lg:flex items-center justify-center py-4 border-t border-white/10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Sliding Background */}
            <AnimatePresence>
              {hoveredCategory && (
                <motion.div
                  className="absolute bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 rounded-xl border border-neon-cyan/30"
                  layoutId="navbar-hover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{
                    left: hoveredCategory.left,
                    top: hoveredCategory.top,
                    width: hoveredCategory.width,
                    height: hoveredCategory.height,
                  }}
                />
              )}
            </AnimatePresence>

            <div className="flex items-center space-x-8 relative">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const parentRect =
                      e.currentTarget.parentElement.getBoundingClientRect();
                    setHoveredCategory({
                      left: rect.left - parentRect.left - 8,
                      top: -8,
                      width: rect.width + 16,
                      height: rect.height + 16,
                    });
                  }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={`/category/${category.id}`}
                    className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl relative z-10"
                  >
                    <motion.span
                      className="text-xl lg:text-2xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {category.icon}
                    </motion.span>
                    <span className="font-medium group-hover:text-neon-cyan transition-colors duration-300">
                      {category.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-dark-100/95 backdrop-blur-xl" />

            {/* Menu Content */}
            <motion.div
              className="relative z-50 h-full overflow-y-auto pt-24 pb-8 px-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for futuristic styles..."
                    className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-neon-pink text-lg"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
                </div>
              </form>

              {/* Mobile Categories */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Categories
                </h3>
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/category/${category.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-4 py-4 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                    >
                      <span className="text-3xl">{category.icon}</span>
                      <span className="font-medium text-lg">
                        {category.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile User Actions */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 py-4 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-300"
                >
                  <User className="w-6 h-6" />
                  <span className="text-lg">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-4 py-4 px-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors duration-300"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg">Exit Portal</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
