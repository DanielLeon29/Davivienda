import mongoose from 'mongoose';

// Asegúrate de que MONGODB_URI es string
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Por favor define MONGODB_URI en .env.local");
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: CachedConnection;
};

let cached: CachedConnection = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // Aquí MONGODB_URI ya está validado como string
    cached.promise = mongoose.connect(MONGODB_URI).then(() => mongoose);
    globalWithMongoose.mongoose = cached;
  }

  cached.conn = await cached.promise;
  return cached.conn;
}