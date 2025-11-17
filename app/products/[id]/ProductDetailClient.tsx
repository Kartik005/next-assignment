// 1. This is the Client Component
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- Using Next.js Image for optimization
// import { useCart } from '../../context/CartContext'; // <-- Import the cart
import { useCart } from '@/app/context/CartContext';

// 2. Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

// 3. This component receives the product as a prop
export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart(); // Get the addToCart function
  const [message, setMessage] = useState(''); // For "Added to cart!" message

  const handleAddToCart = () => {
    addToCart(product);
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  // 4. This is all the JSX from your page, now in a client component
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
        >
          &larr; Back to Products
        </Link>

        {/* Product Card, to display full product details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 rounded-xl p-6">
              <Image
                src={product.image}
                alt={product.title}
                width={400} // <-- <Image> requires width
                height={400} // <-- <Image> requires height
                className="max-h-96 w-auto object-contain hover:scale-105 transition-transform duration-300"
                priority // <-- Good for LCP
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-yellow-500">★</span>
                    <span className="ml-2 text-xl font-semibold text-slate-900">
                      {product.rating.rate}
                    </span>
                    <span className="ml-2 text-slate-600">
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-slate-600 text-sm font-medium mb-2">Price</p>
                  <p className="text-4xl font-bold text-slate-900">
                    ${product.price}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-slate-600 text-sm font-medium mb-3">
                    About this product
                  </p>
                  <p className="text-slate-700 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* 5. Interactive "Add to Cart" Button */}
              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                  Add to Cart
                </button>
                {message && (
                  <p className="text-green-600 font-semibold mt-4 text-center">
                    {message}
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}