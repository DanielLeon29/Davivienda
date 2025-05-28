import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/productos' },
    { name: 'Sobre Nosotros', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                TechShop
              </span>
            </Link>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-red-600 bg-red-50'
                    : 'text-white hover:text-red-600 hover:bg-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Acciones (carrito, usuario) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Buscador */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Carrito */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"
                />
              </svg>
              {/* Badge del carrito */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Usuario */}
            <Link
              href="/login"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Acciones móviles */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3 space-x-3">
              <Link
                href="/cart"
                className="flex items-center text-gray-700 hover:text-red-600"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"
                  />
                </svg>
                Carrito (0)
              </Link>
            </div>
            <div className="mt-3 px-3">
              <Link
                href="/login"
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}