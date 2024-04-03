import mongoose from "mongoose";

if (!process.env.MONGO_URL) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGO_URL: string = process.env.MONGO_URL!;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // replace mongo_url withthe  connection url for your vps
    //`mongodb://<your_vps_ip>:27017/your_database_name`

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
