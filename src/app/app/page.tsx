import { connectToDB } from '@/lib/mongoose';
import Product from '@/models/Product';

export default async function Home() {
  await connectToDB();
  const products = await Product.find({});

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id.toString()}> {/* Convertir ObjectId a string */}
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}