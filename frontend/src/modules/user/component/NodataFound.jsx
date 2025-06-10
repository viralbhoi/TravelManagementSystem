import React from 'react'

export default function NotFound({message='No data found'}) {
  return (
    <div className='flex items-center justify-center h-56  bg-blue-100 rounded-2xl shadow-md m-5'>
      <p className='text-blue-900 text-xl font-semibold'>{message}</p>
    </div>
  );
}
