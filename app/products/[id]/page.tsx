import Link from "next/link";
import { memo } from "react";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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


async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      {
        method: "GET",
      }
    );
    if(!response.ok) return null;
    const product = await response.json();
    return product;
  }
  catch {
    console.log("Failed to fetch product!");
    return null;
  }
}

// for SSG, static params generation, fetch products in advance
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  return products.map((p) => ({ id: p.id.toString() }));
}
export const revalidate = 3600; // revalidate every 1 hour (optional, for ISR)


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if(!product){
    return {
      title: 'Product not found',
      description: "This product does not exist",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 400,
          height: 400,
           alt: product.title,
        },
      ]
    }
  }
}

// const ProductPage = async ({params}) => {
// const { id } = await params;
// console.log(id);
const ProductPage = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;
  const product = await getProduct(id);
  // get product by id, and then render the product
  console.log(product);


  if (!product) {
    notFound();
  }
  // moving all the jsx to productDetailCLient as it is a server component

  return <ProductDetailClient product={product} />
};

export default memo(ProductPage);