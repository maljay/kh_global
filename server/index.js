import express from 'express';
//import cookieParser from 'cookie-parser';
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

/**
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
*/

//app.use(cookieParser());

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