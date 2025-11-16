import Link from 'next/link'
import React from 'react'

const adminPanel = () => {
  return (
    <section className="min-h-screen bg-gray-100 p-8 flex flex-col items-center pt-24">
      
      {/* A white card container for the links */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Admin Panel
        </h1>
        
        {/* Use space-y to automatically add margin between children */}
        <div className="space-y-4">
          
          {/* Styled Link 1 */}
          <Link 
            href='/admin/add-product'
            className="block w-full p-4 bg-gray-200 text-gray-800 rounded-md text-center font-medium hover:bg-gray-300 transition-colors"
          >
            Add a New Product
          </Link>
          
          {/* Styled Link 2 */}
          <Link 
            href="/admin/products"
            className="block w-full p-4 bg-gray-200 text-gray-800 rounded-md text-center font-medium hover:bg-gray-300 transition-colors"
          >
            View All Products
          </Link>

        </div>
      </div>
    </section>
  )
}

export default adminPanel
