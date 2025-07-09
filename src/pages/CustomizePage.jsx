import React, { useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useCartStore } from "../store/useStore";
import toast from "react-hot-toast";

// Simple 3D T-Shirt Component
const TShirt3D = ({ color, pattern, text }) => {
  return (
    <mesh>
      <boxGeometry args={[2, 2.5, 0.1]} />
      <meshStandardMaterial color={color} />
      {text && (
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1, 0.3]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
        </mesh>
      )}
    </mesh>
  );
};

const CustomizePage = () => {
  const { productId } = useParams();
  const { addItem } = useCartStore();

  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [customText, setCustomText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState("#000000");
  const [activeTab, setActiveTab] = useState("color");
  const [designHistory, setDesignHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#000000",
    "#ffffff",
    "#6b7280",
    "#dc2626",
    "#059669",
    "#d97706",
  ];

  const patterns = [
    { id: "none", name: "None", preview: null },
    { id: "stripes", name: "Stripes", preview: "||||" },
    { id: "dots", name: "Polka Dots", preview: "•••" },
    { id: "geometric", name: "Geometric", preview: "◊◊◊" },
  ];

  const fonts = ["Arial", "Georgia", "Times New Roman", "Helvetica", "Impact"];

  const product = {
    id: productId,
    name: "Custom T-Shirt Design",
    basePrice: 29.99,
    customizationFee: 10.0,
  };

  const totalPrice = product.basePrice + product.customizationFee;

  const handleSaveDesign = () => {
    const design = {
      color: selectedColor,
      pattern: selectedPattern,
      text: customText,
      textPosition,
      textSize,
      textColor,
    };
    toast.success("Design saved successfully!");
    console.log("Saved design:", design);
  };

  const handleAddToCart = () => {
    const customProduct = {
      ...product,
      name: `${product.name} (Custom)`,
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
    toast.success("Custom design added to cart!");
  };

  const resetDesign = () => {
    setSelectedColor("#3b82f6");
    setSelectedPattern(null);
    setCustomText("");
    setTextPosition({ x: 0, y: 0 });
    setTextSize(16);
    setTextColor("#000000");
    toast.success("Design reset!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={`/product/${productId}`}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Product
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                3D Designer Studio
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  /* Undo */
                }}
                className="p-2 text-gray-600 hover:text-gray-900 border rounded-lg"
              >
                <Undo2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  /* Redo */
                }}
                className="p-2 text-gray-600 hover:text-gray-900 border rounded-lg"
              >
                <Redo2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleSaveDesign}
                className="btn-secondary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Design
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 lg:h-[600px] relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <TShirt3D
                      color={selectedColor}
                      pattern={selectedPattern}
                      text={customText}
                    />
                    <OrbitControls enablePan={false} />
                    <Environment preset="studio" />
                  </Suspense>
                </Canvas>

                {/* Overlay Text */}
                {customText && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: "50%",
                      top: "45%",
                      transform: "translate(-50%, -50%)",
                      fontSize: `${textSize}px`,
                      color: textColor,
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {customText}
                  </div>
                )}
              </div>

              {/* 3D Controls */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Use mouse to rotate and zoom</span>
                  <div className="flex space-x-4">
                    <button className="hover:text-gray-900">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="hover:text-gray-900">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="border-b">
                <nav className="flex">
                  {[
                    { id: "color", name: "Color", icon: Palette },
                    { id: "text", name: "Text", icon: Type },
                    { id: "graphics", name: "Graphics", icon: ImageIcon },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium ${
                          activeTab === tab.id
                            ? "border-b-2 border-primary-600 text-primary-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Color Tab */}
                {activeTab === "color" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Base Color</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-12 h-12 rounded-lg border-2 ${
                              selectedColor === color
                                ? "border-gray-900"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Pattern</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {patterns.map((pattern) => (
                          <button
                            key={pattern.id}
                            onClick={() =>
                              setSelectedPattern(
                                pattern.id === "none" ? null : pattern.id,
                              )
                            }
                            className={`p-3 border rounded-lg text-center ${
                              selectedPattern === pattern.id ||
                              (selectedPattern === null &&
                                pattern.id === "none")
                                ? "border-primary-600 bg-primary-50"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <div className="text-lg mb-1">
                              {pattern.preview}
                            </div>
                            <div className="text-sm">{pattern.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Text Tab */}
                {activeTab === "text" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Text
                      </label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="Enter your text..."
                        className="input-field"
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Size
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="32"
                        value={textSize}
                        onChange={(e) => setTextSize(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>Small</span>
                        <span>Large</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {colors.slice(0, 8).map((color) => (
                          <button
                            key={color}
                            onClick={() => setTextColor(color)}
                            className={`w-10 h-10 rounded border-2 ${
                              textColor === color
                                ? "border-gray-900"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Graphics Tab */}
                {activeTab === "graphics" && (
                  <div className="space-y-6">
                    <div className="text-center py-8 text-gray-500">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4" />
                      <p>Graphics upload feature</p>
                      <p className="text-sm">Coming soon!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${product.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customization:</span>
                  <span>${product.customizationFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-3 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={resetDesign}
                  className="w-full btn-secondary py-3 flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset Design
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
