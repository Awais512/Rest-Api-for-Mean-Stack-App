const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./db');
dotenv.config();

app.use(cors());
app.options('*', cors());

//Impoting Routes Files
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

//Database Connection
connectDb();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
