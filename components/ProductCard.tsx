import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar navegación cuando se hace clic en el botón
    // Aquí puedes implementar la lógica para agregar al carrito
    console.log('Agregado al carrito:', product);
    // Ejemplo: dispatch(addToCart(product))
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isHovered ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer">
          {/* Imagen del producto */}
          <div className="relative h-48 bg-gray-200">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Badge de categoría */}
            <div className="absolute top-2 left-2">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Badge de precio en hover */}
            {isHovered && (
              <div className="absolute top-2 right-2">
                <span className="bg-green-600 text-white text-sm font-bold px-2 py-1 rounded-lg">
                  {formatPrice(product.price)}
                </span>
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-600">
                {formatPrice(product.price)}
              </span>
              
              {/* Rating de ejemplo */}
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">(4.0)</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Botón de agregar al carrito */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
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
          <span>Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
}