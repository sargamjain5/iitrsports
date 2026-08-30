import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

global.mongoose = cached;

export function isDbConfigured(): boolean {
  return Boolean(MONGODB_URI);
}

export async function connectDB(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    // Thrown at call time (not import time) so callers can fall back gracefully.
    throw new Error("MONGODB_URI is not defined — database is not configured");
  }

  // Already connected
  if (cached.conn) {
    return cached.conn;
  }

  // Connection is already being established
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}