import { connectToDB } from '@/lib/mongoose';
import Product from '@/models/Product';

export default async function Home() {
  await connectToDB();
  const products = await Product.find({});

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product._id.toString()} className="border p-4 rounded-lg">
            <h2 className="text-xl">{product.name}</h2>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}