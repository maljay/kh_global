import mongoose from "mongoose"; //model and schema library for mongodb

const connectDB = async (url) => {
  
  mongoose.set('strictQuery', true);

  mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));
}

export default connectDB;