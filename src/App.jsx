import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "./store/useStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CustomizePage from "./pages/CustomizePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main App Layout (with Header and Footer)
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-100 text-white relative overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-mesh animate-gradient-xy opacity-10 pointer-events-none" />
      <div className="fixed inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Floating Quantum Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5", "#ffbe0b"][i % 5]
              } 0%, transparent 70%)`,
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(3px)",
            }}
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <Header />

      <motion.main
        className="min-h-screen relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};

function App() {
  const { isAuthenticated } = useUserStore();

  return (
    <Router>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Landing Page - No Layout */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LandingPage />
                  </motion.div>
                )
              }
            />

            {/* Login Page - No Layout */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LoginPage />
                  </motion.div>
                )
              }
            />

            {/* Protected Routes - With Layout */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HomePage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/category/:categoryId"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="category"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CategoryPage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:productId"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="product"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductPage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/customize/:productId"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="customize"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CustomizePage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="cart"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CartPage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="checkout"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckoutPage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProfilePage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <motion.div
                      key="search"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SearchPage />
                    </motion.div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/home" : "/"} replace />
              }
            />
          </Routes>
        </AnimatePresence>

        {/* Enhanced Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(26, 26, 46, 0.9)",
              color: "#fff",
              border: "1px solid rgba(255, 0, 110, 0.3)",
              borderRadius: "16px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px 0 rgba(255, 0, 110, 0.2)",
            },
            success: {
              iconTheme: {
                primary: "#06ffa5",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ff006e",
                secondary: "#fff",
              },
            },
          }}
        />

        {/* Quantum Loading Indicator */}
        {isAuthenticated && (
          <motion.div
            className="fixed bottom-8 right-8 pointer-events-none z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-neon-blue" />
          </motion.div>
        )}
      </div>
    </Router>
  );
}

export default App;
