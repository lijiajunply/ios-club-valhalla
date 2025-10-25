"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <Link href="/" className="text-2xl font-bold text-gray-900">iOS Club 英灵殿</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            href="/" 
            className={`font-medium transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            首页
          </Link>
          <Link 
            href="/about"
            className={`font-medium transition-colors ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            关于
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              href="/" 
              className={`font-medium py-2 ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              href="/about/page"
              className={`font-medium py-2 ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              关于
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}