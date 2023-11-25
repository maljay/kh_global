import express from 'express'
//import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
//import compress from 'compression'
import cors from 'cors'
import "dotenv/config.js"; // allows us to use environment variables
//import helmet from 'helmet'
import connectDB from './connectDB/connect.js'
//import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json());
//app.use(compress())
//app.use(helmet())

/**
Solve a bug (..The value of the 'Access-Control-Allow-Origin'
header in the response must not be the wildcard '*' when the
request's credentials mode is 'include'... ) with following
lines (24 - 29)
*/
var corsOptions = {
  origin: ["http://localhost:5000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

//app.use(cors())

//app.use('/', userRoutes)
app.use('/', authRoutes)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

const startServer = async () => {
  try {
    // connect to the database
    connectDB(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () => console.log(`Server started on port http://localhost:${process.env.PORT}`));
  }catch(error) {
    console.log(error);
  }
}

startServer();