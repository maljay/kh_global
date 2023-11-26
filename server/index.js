import express from 'express'
//import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
//import compress from 'compression'
//import cors from 'cors'
import "dotenv/config.js"; // allows us to use environment variables
//import helmet from 'helmet'
import connectDB from './connectDB/connect.js'
//import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

// Set middleware of CORS 
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://kh-global-links.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
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

var corsOptions = {
  origin: ["https://kh-global-links.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
*/

/**
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','https://kh-global.onrender.com');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
 */
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
    app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  }catch(error) {
    console.log(error);
  }
}

startServer();