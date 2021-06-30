const mongoose = require('mongoose');

const connectDb = async () => {
  const URL = process.env.MONGO_URI;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongoDb is connected');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
