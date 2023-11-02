const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const purchaseRoutes = require('./src/routes/purchaseRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
