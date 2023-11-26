import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config.js";
import connectDB from './connectDB/connect.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(
  cors({
    origin: ["https://kh-global-links.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();