import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mi E-commerce</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold mb-6 text-gray-50">¡Bienvenido!</h1>

          {/* Espacio para la imagen */}
          <div className="max-w-md mx-auto bg-white p-2 rounded-lg shadow-md">
            <img src="../Logo.jpeg" alt="Imagen destacada" />
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Link href="/productos">
              <button className="px-6 py-3 bg-red-600 text-white rounded-full border-4 border-red-600 hover:bg-red-700 transition-all">
                Ver Productos
              </button>
            </Link>

            <Link href="/login">
              <button className="px-6 py-3 bg-red-600 text-white rounded-full border-4 border-red-600 hover:bg-red-700 transition-all">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}