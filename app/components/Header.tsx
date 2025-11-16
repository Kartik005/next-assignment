import Link from 'next/link';
import { memo } from 'react';

const Header = () => {
  return (
    <div className='border-b p-4'>
      <h1 className='text-4xl font-bold m-8 bg-gray-50 text-gray-900 '>FakeStore!</h1>
      <Link
        href="/"
        className="text-xl font-bold bg-gray-50 text-slate-500">
        Go back home
      </Link>
      
    </div>
  );
};

export default memo(Header);