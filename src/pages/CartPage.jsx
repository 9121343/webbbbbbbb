import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useStore";

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs">IMG</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span className="ml-4 flex items-center">
                          Color:
                          <div
                            className="w-4 h-4 rounded-full ml-2 border"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                    </div>
                    {item.customization && (
                      <div className="text-sm text-primary-600 mt-1">
                        Custom Design
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">${item.price} each</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
              <Link
                to="/"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items ({getTotalItems()}):</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full btn-primary mt-6 py-3 text-center block"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Free shipping on orders over $50</p>
              <p className="mt-1">30-day easy returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
