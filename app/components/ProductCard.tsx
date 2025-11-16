// components/ProductCard.tsx
import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="w-64 border p-4 rounded-lg shadow hover:shadow-md transition">
      <img src={product.image} alt={product.title} className="h-40 w-full object-contain" />
      <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
      <p className="text-blue-600 font-bold">${product.price}</p>
      <div className="text-xs text-slate-500 mt-1">
        rate: {product.rating.rate} ({product.rating.count})
      </div>
    </article>
  );
}

// i can change the product card later on to have conditionalrendering

// basically, when its displayed in the repo and is not focused,then it appears like normal
// but when its focused, it shows more details about the product like description, category etc.

// f*ck this co pilot bot, it always autocompletes the comments i want to write