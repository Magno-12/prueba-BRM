const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const errorHandler = require('./src/middlewares/errorHandling');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const purchaseRoutes = require('./src/routes/purchaseRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
