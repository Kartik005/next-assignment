
import { memo } from "react";
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

const ProductListPage = async () => {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
  });

  const productList = await response.json();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="flex justify-center items-center fit-content flex-wrap gap-4 p-4">
        {productList.length &&
          productList.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} id={product.id}/>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default memo(ProductListPage);
