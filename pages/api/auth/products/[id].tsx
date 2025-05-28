import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features?: string[];
  specifications?: { [key: string]: string };
  inStock: boolean;
  rating: number;
  reviews: number;
}

// Datos de ejemplo - en un proyecto real esto vendría de una API
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Gaming",
    price: 1299.99,
    image: "/api/placeholder/600/400",
    description: "Laptop para gaming de alto rendimiento con procesador Intel Core i7 y tarjeta gráfica RTX 3060. Perfecta para juegos modernos y trabajo profesional.",
    category: "Electrónicos",
    features: [
      "Procesador Intel Core i7-11800H",
      "16GB RAM DDR4",
      "SSD 512GB NVMe",
      "NVIDIA RTX 3060 6GB",
      "Pantalla 15.6\" Full HD 144Hz",
      "Teclado RGB retroiluminado"
    ],
    specifications: {
      "Procesador": "Intel Core i7-11800H",
      "Memoria RAM": "16GB DDR4",
      "Almacenamiento": "512GB SSD NVMe",
      "Tarjeta Gráfica": "NVIDIA RTX 3060 6GB",
      "Pantalla": "15.6\" Full HD (1920x1080) 144Hz",
      "Sistema Operativo": "Windows 11 Home",
      "Peso": "2.3 kg",
      "Batería": "80Wh"
    },
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  // Puedes agregar más productos aquí...
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      // Simular carga de datos de la API
      setTimeout(() => {
        const foundProduct = sampleProducts.find(p => p.id === parseInt(id as string));
        setProduct(foundProduct || null);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log('Agregado al carrito:', { product, quantity });
      // Aquí implementarías la lógica para agregar al carrito
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Producto no encontrado
            </h1>
            <p className="text-gray-600 mb-8">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Inicio
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/products" className="text-gray-500 hover:text-gray-700">
            Productos
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imágenes del producto */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails - opcional */}
            <div className="flex space-x-2">
              {[...Array(4)].map((_, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 bg-gray-200 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    En stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                    Agotado
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.246.755-.617 1.38-1.262.918L10 13.347l-2.8 2.034c-.646.462-1.509-.163-1.262-.918l1.07-3.292a1 1 0 00-.364-1.118L3.844 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l font-bold"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >-</button>
                  <span className="px-3">{quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-r font-bold"
                    onClick={() => setQuantity(q => q + 1)}
                  >+</button>
                </div>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Agregar al carrito' : 'No disponible'}
              </button>
            </div>

            {/* Características */}
            {product.features && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Características</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Especificaciones */}
            {product.specifications && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Especificaciones</h2>
                <table className="w-full text-sm text-gray-700">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="font-medium pr-4 py-1">{key}</td>
                        <td className="py-1">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
