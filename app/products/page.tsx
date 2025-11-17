"use client"

import { memo, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

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

// changing product page to a client component cuz now it needs filtering
const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // "" means "All"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData: Product[] = await productsResponse.json();
        const categoriesData: string[] = await categoriesResponse.json();
        
        setProducts(productsData);
        setCategories(categoriesData);

      }
      catch (err) {
        setError("An unknown error occured");
      }
      finally {
        setLoading(false);
      }

    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    if(selectedCategory){
      tempProducts = tempProducts.filter( product => product.category === selectedCategory);
    }

    if(searchTerm){
      tempProducts = tempProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return tempProducts;
  }, [searchTerm, products, selectedCategory]);

  if (loading) {
    return (
      <section className="p-8 flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading products...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="p-8 flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Unexpected error</p>
      </section>
    )
  }

  return (
    <section className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm text-black bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {/* Capitalize first letter */}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        {
          products.length === 0 ? (
            <p>No products found</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products matching {searchTerm}</p>
          ) : (
            <div className="flex justify-center items-center fit-content flex-wrap gap-4 p-4">
              {
                filteredProducts.map((product: Product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <ProductCard product={product} id = {product.id} />
                  </Link>
                ))
              }
            </div>
          )
        }

      </div>
    </section>
  );
};

export default memo(ProductListPage);
