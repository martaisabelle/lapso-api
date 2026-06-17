// Aula 21: conexão com MongoDB Atlas usando Mongoose
import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'lapso',
    });
    console.log('Conectado ao MongoDB Atlas com sucesso.');
  } catch (error) {
    console.error('Falha ao conectar ao MongoDB Atlas', error);
    process.exit(1);
  }
};

export default connectDB;