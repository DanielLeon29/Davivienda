import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg border border-red-600">
          <h2 className="text-2xl font-bold text-center text-black">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-red-600">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-red-600 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-black hover:text-black"
            >
              {isLogin 
                ? '¿No tienes cuenta? Regístrate aquí' 
                : '¿Ya tienes cuenta? Inicia sesión aquí'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}