import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit3,
  Save,
  Camera,
  Zap,
  Eye,
} from "lucide-react";
import { useUserStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Neural User",
    email: "user@stylexx.com",
    phone: "+1 (555) 123-4567",
    bio: "Fashion enthusiast exploring the quantum realm of style.",
  });

  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const tabs = [
    { id: "account", name: "Neural Profile", icon: User },
    { id: "orders", name: "Quantum Orders", icon: Package },
    { id: "designs", name: "My Designs", icon: Heart },
    { id: "settings", name: "System Config", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-100 py-24">
      {/* Floating Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${["#ff006e", "#8338ec", "#3a86ff", "#06ffa5"][i % 4]} 0%, transparent 70%)`,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(2px)",
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue mb-4">
            Neural Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Manage your quantum identity and digital assets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card-dark sticky top-32">
              {/* Profile Avatar */}
              <div className="text-center p-6 border-b border-white/10">
                <div className="relative inline-block">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-r from-neon-pink to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-neon"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <User className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.button
                    className="absolute -bottom-2 -right-2 p-2 bg-neon-cyan rounded-full text-dark-100 shadow-neon-blue"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {user?.name || "Neural User"}
                </h3>
                <p className="text-neon-cyan text-sm font-medium">
                  Quantum Level: Elite
                </p>
                <div className="flex items-center justify-center mt-2 text-xs text-white/60">
                  <Zap className="w-3 h-3 mr-1 text-neon-cyan" />
                  <span>Status: Active</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 text-neon-cyan border border-neon-cyan/30"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.name}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <motion.button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Exit Portal
                  </motion.button>
                </div>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="card-dark p-8">
              {/* Neural Profile Tab */}
              {activeTab === "account" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <User className="w-6 h-6 mr-3 text-neon-cyan" />
                      Neural Profile Configuration
                    </h2>
                    <motion.button
                      onClick={() =>
                        isEditing ? handleSave() : setIsEditing(true)
                      }
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl text-white font-medium hover:from-neon-purple hover:to-neon-blue transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isEditing ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit3 className="w-4 h-4" />
                      )}
                      <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-3">
                        Neural Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled={!isEditing}
                        className="input-field disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-3">
                        Quantum Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className="input-field disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-3">
                        Neural Link
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="input-field disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-3">
                        Quantum Status
                      </label>
                      <div className="flex items-center space-x-3 p-3 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
                        <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
                        <span className="text-neon-cyan font-medium">
                          Elite Member
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Bio Matrix
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="input-field disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Quantum Orders Tab */}
              {activeTab === "orders" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Package className="w-6 h-6 mr-3 text-neon-blue" />
                    Quantum Order History
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        id: "#QX-2024-001",
                        date: "March 15, 2024",
                        status: "Delivered",
                        total: "$89.99",
                        items: "Quantum Mesh T-Shirt (Custom)",
                      },
                      {
                        id: "#QX-2024-002",
                        date: "March 10, 2024",
                        status: "Processing",
                        total: "$199.99",
                        items: "Holographic Runners (Custom)",
                      },
                      {
                        id: "#QX-2024-003",
                        date: "March 5, 2024",
                        status: "Shipped",
                        total: "$49.99",
                        items: "Neural Link Hoodie",
                      },
                    ].map((order, index) => (
                      <motion.div
                        key={order.id}
                        className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="font-bold text-white">
                                {order.id}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-500/20 text-green-400"
                                    : order.status === "Shipped"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-yellow-500/20 text-yellow-400"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="text-white/70 text-sm mb-1">
                              {order.items}
                            </p>
                            <p className="text-white/50 text-sm">
                              {order.date}
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 text-right">
                            <p className="text-xl font-bold text-neon-cyan">
                              {order.total}
                            </p>
                            <button className="text-neon-pink hover:text-white text-sm transition-colors duration-300">
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* My Designs Tab */}
              {activeTab === "designs" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Heart className="w-6 h-6 mr-3 text-neon-pink" />
                    My Quantum Designs
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((design, index) => (
                      <motion.div
                        key={design}
                        className="group relative card-dark p-4 hover:shadow-neon transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="aspect-square bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-lg mb-4 flex items-center justify-center">
                          <Eye className="w-12 h-12 text-neon-cyan opacity-60" />
                        </div>
                        <h3 className="font-semibold text-white mb-2">
                          Design #{design}
                        </h3>
                        <p className="text-white/60 text-sm mb-3">
                          Custom T-Shirt Design
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-neon-cyan font-medium">
                            Saved
                          </span>
                          <button className="text-neon-pink hover:text-white text-sm transition-colors duration-300">
                            Edit
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* System Config Tab */}
              {activeTab === "settings" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Settings className="w-6 h-6 mr-3 text-neon-purple" />
                    System Configuration
                  </h2>

                  <div className="space-y-6">
                    {[
                      {
                        label: "Neural Notifications",
                        description:
                          "Receive updates about new designs and orders",
                        enabled: true,
                      },
                      {
                        label: "Quantum Sync",
                        description: "Sync your designs across all devices",
                        enabled: true,
                      },
                      {
                        label: "Auto-Save Designs",
                        description: "Automatically save your customizations",
                        enabled: false,
                      },
                      {
                        label: "Beta Features",
                        description: "Access experimental quantum features",
                        enabled: true,
                      },
                    ].map((setting, index) => (
                      <motion.div
                        key={setting.label}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">
                            {setting.label}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {setting.description}
                          </p>
                        </div>
                        <motion.label
                          className="relative inline-flex items-center cursor-pointer"
                          whileTap={{ scale: 0.95 }}
                        >
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={setting.enabled}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-neon-pink peer-checked:to-neon-purple"></div>
                        </motion.label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
