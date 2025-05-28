import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Gaming",
    price: 1299.99,
    image: "/api/placeholder/300/200",
    description: "Laptop para gaming de alto rendimiento",
    category: "Electrónicos"
  },
  {
    id: 2,
    name: "Smartphone Pro",
    price: 899.99,
    image: "/api/placeholder/300/200",
    description: "Smartphone con cámara profesional",
    category: "Electrónicos"
  },
  {
    id: 3,
    name: "Auriculares Bluetooth",
    price: 199.99,
    image: "/api/placeholder/300/200",
    description: "Auriculares inalámbricos con cancelación de ruido",
    category: "Audio"
  },
  {
    id: 4,
    name: "Tablet Pro",
    price: 599.99,
    image: "/api/placeholder/300/200",
    description: "Tablet profesional para diseño",
    category: "Electrónicos"
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 299.99,
    image: "/api/placeholder/300/200",
    description: "Reloj inteligente con monitor de salud",
    category: "Wearables"
  },
  {
    id: 6,
    name: "Cámara Digital",
    price: 799.99,
    image: "/api/placeholder/300/200",
    description: "Cámara digital profesional",
    category: "Fotografía"
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre nuestra amplia selección de productos de alta calidad
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-black hover:bg-gray-200'
              } border border-red-600`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">
              No se encontraron productos en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}