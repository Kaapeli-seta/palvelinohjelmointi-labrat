import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CustomError from '../classes/CustomError';
dotenv.config();

const mongoConnect = async () => {
  // Connect to MongoDB
  if (!process.env.DB_URL) {
    throw new CustomError('no connection found', 500);
  }
  const connection = await mongoose.connect(process.env.DB_URL as string);
  console.log('DB connected successfully');
  return connection;
};

export default mongoConnect;
