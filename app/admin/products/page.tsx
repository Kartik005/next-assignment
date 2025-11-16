import fs from 'fs';
import Link from 'next/link';
import path from 'path';

type Product = {
  title: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
};

function getProducts(): Product[] {
     const filePath = path.join(process.cwd(), 'data', 'products.json');
     try{
         const data = fs.readFileSync(filePath, 'utf-8');
         return JSON.parse(data);
     }
     catch(err){
          console.error('Error reading products file:', err);
         return [];
     }
 }
 

const ProductsPage = () => {
  const products = getProducts();
  return (
    <section className="p-8">
      <Link 
        href={'/admin'}
        className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors mb-6"
      >
        &larr; Back to Admin Panel
      </Link>

      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      
      {/* Check if there are any products */}
      {products.length === 0 ? (
        <p>No products found. Go add some!</p>
      ) : (
        <ul className="space-y-4">
          {/* 3. Map over the data and display it */}
          {products.map((product, index) => (
            <li key={index} className="flex p-4 border rounded-lg shadow-sm bg-white text-black">
              <img 
                src={product.imageUrl || 'https://via.placeholder.com/150'} 
                alt={product.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold mt-2">${product.price}</p>
                <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full mt-2 inline-block">
                  {product.category}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProductsPage
