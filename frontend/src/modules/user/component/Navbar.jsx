import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar({ title = "Panel", navLinks = [], onLogout }) {
  return (
    <div className='flex flex-wrap w-full min-h-16 items-center justify-between px-4 py-3 gap-7 rounded-b-md border-b-2 shadow-2xl text-amber-50 bg-blue-900'>

      {/* Left: Title */}
      <div className='text-lg font-semibold'>
        {title}
      </div>

      {/* Middle: Nav links */}
      <nav className='flex flex-wrap flex-1  gap-4 text-sm justify-end sm:text-base'>
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className='hover:underline hover:text-amber-300'
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: Logout Button */}
      <div className='flex-shrink-0'>
        <button
          className='bg-red-800 px-4 py-2 hover:bg-red-600 rounded-md'
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
}
