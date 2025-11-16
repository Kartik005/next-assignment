"use client";

import Link from "next/link";
import { use, useState } from "react";


const AddProduct = () => {

  const [formData, setFormData] =  useState({
    title: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    
    setFormData( (prevData) => ({
      ...prevData,
      [name]: value
    }))
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setSuccessMessage('');
    // setSuccessMessage("Successfully added the product !!")

    try{
      const response = await fetch('/api/products',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if(response.ok){
        setSuccessMessage(`Successfully: ${result.message}`);
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
          imageUrl: '',
        });
      }
      else{
        setSuccessMessage(`Error: ${result.message}`);
      }
    }
    catch(err){
      console.error("Error occured", err);
      setSuccessMessage('Error: Failed to add product. Please try again.');

    }
    // console.log(formData);
  };

  return (
    <>
      <Link
        href={'/admin'}
        className=" m-8 inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors mb-6"
      >
        &larr; Back to Admin Panel
      </Link>
    <section className='p-8 bg-gray-50 text-slate-900 justify-center items-center flex flex-col'>

      <h1 className='font-bold m-8'>Add a new product</h1>

      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          {/* title */}
          <label className='font-semibold' htmlFor="title">
            Title
          </label>
          <input
          onChange={handleChange}
          value={formData.title}
            type="text"
            id="title"
            name="title"
            className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2" />
        </div>

        {/* descrpition */}
        <div>
          <label className='font-semibold' htmlFor="description">
            Description
          </label>
          <input
          onChange={handleChange}
          value={formData.description}
            type="text"
            name="description"
            id="description"
            className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2" />
        </div>

        {/* price */}
        <div>
          <label className='font-semibold' htmlFor="price">
            Price
          </label>
          <input
          onChange={handleChange}
          value={formData.price}
            type="text"
            name="price"
            id="price"
            className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2" />
        </div>

        {/* category */}
        <div>
          <label className='font-semibold' htmlFor="category">
            Category
          </label>
          <input
          onChange={handleChange}
          value={formData.category}
            type="text"
            id='category'
            name='category'
            className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2" />
        </div>
        {/* image url */}
        <div>
          <label className='font-semibold' htmlFor="imageUrl">
            Image URL
          </label>
          <input
          onChange={handleChange}
          value={formData.imageUrl}
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2"
          />
        </div>

        {/* submit button */}
        <button type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add Product
        </button>

      </form>

    </section>
    </>
  );
}

export default AddProduct
