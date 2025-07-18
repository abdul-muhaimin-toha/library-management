import dotenv from 'dotenv';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const PORT = process.env.PORT || 3000;

if (!MONGODB_USER || !MONGODB_PASSWORD) {
   throw new Error('❌ Missing MongoDB credentials in environment variables');
}

let server: Server;

(async function main() {
   try {
      await mongoose.connect(
         `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.5chsr9x.mongodb.net/LibraryManagementApp?retryWrites=true&w=majority&appName=Cluster0`
      );
      console.log('✅ MongoDB connected');

      server = app.listen(PORT, () => {
         console.log(`☑️  App is listening at port ${PORT}`);
      });

      // Graceful shutdown
      process.on('SIGINT', async () => {
         console.log('🔄 Gracefully shutting down...');
         await mongoose.disconnect();
         server.close(() => {
            console.log('🔒 Server closed');
            process.exit(0);
         });
      });
   } catch (error) {
      console.error('❌ Application failed to start:', error);
   }
})();
