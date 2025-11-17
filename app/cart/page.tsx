"use client"

import React from 'react'
import { useCart } from '../context/CartContext'
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    totalPrice,
  } = useCart();
  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Shopping Cart</h1>
      
      {/* Check if cart is empty */}
      {cartCount === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center p-4 bg-white rounded-lg shadow border"
              >
                <Link href={`/products/${item.id}`} className="shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain rounded"
                  />
                </Link>
                <div className="grow ml-0 sm:ml-4 mt-4 sm:mt-0 text-center sm:text-left">
                  <Link
                    href={`/products/${item.id}`}
                    className="text-lg font-medium text-gray-900 hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                  <p className="text-gray-700 font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0 sm:ml-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 p-1 border rounded text-center text-black"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium px-4 py-2 border-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-900">FREE</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold mt-6 hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}