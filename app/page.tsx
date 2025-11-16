import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center font-sans bg-slate-50 text-slate-900">
      {/* <div className="flex-col"> */}
      {/* <Header/> */}

      <h1 className="text-4xl font-bold mt-10 mb-6">Welcome to the FakeStore!</h1>

      <Link 
        href="/products"
        className="font-semibold bg-gray-50 text-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer mb-8"> View Products</Link>

      <Link
        href="/admin"
        className=" font-semibold bg-gray-50 text-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer mb-8"> Go to admin panel</Link>
      
      {/* <Footer/> */}

      {/* </div> */}
    </div>
  );
}
