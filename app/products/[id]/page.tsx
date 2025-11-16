import Link from "next/link";
import { memo } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  return products.map((p) => ({ id: p.id.toString() }));
}
export const revalidate = 3600; // revalidate every 1 hour (optional, for ISR)

const ProductPage = async ({params}) => {
  const { id } = await params;
  // console.log(id);
  const response = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    {
      method: "GET",
    }
  );

  const product = await response.json();
  // get product by id, and then render the product
  console.log(product);
 

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
        >
          Back to Products
        </Link>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 rounded-xl p-6">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductPage);

// {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }
