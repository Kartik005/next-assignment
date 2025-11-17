"use client"
import Link from 'next/link';
import { memo } from 'react';
import { useCart } from '../context/CartContext';


const Header = () => {
  const {cartCount} = useCart();
  // useCart
  return (
    <header className='bg-white text-gray-900 shadow-md'>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          
          {/* Logo/Home Link */}
          <div className="flex items-center">
            <Link href="/" className="text-4xl font-bold m-8 bg-gray-50 text-gray-900">
              FakeStore!
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Products
            </Link>
            <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Admin
            </Link>
          </div>

          {/* Cart Icon & Count */}
          <div className="ml-4 flow-root">
            <Link href="/cart" className="group -m-2 p-2 flex items-center">
              {/* Simple Cart Icon (you can replace this with an SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 group-hover:text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.121 0 .239.035.348.104.11.069.206.16.275.277l2.118 4.077c.096.185.132.39.132.599 0 .314-.14.615-.38.82A1.873 1.873 0 0 1 18.118 21H7.5a3 3 0 0 1-2.94-2.404l-1.04-4.821c-.053-.245-.078-.5-.078-.757 0-1.657 1.343-3 3-3Z" />
              </svg>

              {/* 4. Display the cartCount */}
              <span className="ml-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full px-2 py-0.5 group-hover:text-gray-800">
                {cartCount}
              </span>
            </Link>
          </div>

        </div>
      </nav>
      {/* <div className='border-b p-4'>
        <h1 className='text-4xl font-bold m-8 bg-gray-50 text-gray-900 '>FakeStore!</h1>
        <Link
          href="/"
          className="text-xl font-bold bg-gray-50 text-slate-500">
          Home
        </Link>
      </div> */}

    </header>
  );
};

export default memo(Header);