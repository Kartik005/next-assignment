import React from 'react'

const NotFound = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center p-16'>
            <h1 className='text-4xl font-bold'>Error: 404</h1>
            <h2 className='text-2xl font-semibold'>Page Not found</h2>
            <p className='text-2xl mb-8'>We couldn't find the page you requested</p>
        </div>
    )
}

export default NotFound
