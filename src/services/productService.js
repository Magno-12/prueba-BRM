const Product = require('../models/product');

async function getAllProducts() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw error;
  }
}

async function createProduct(productData) {
  try {
    if (!productData.lotNumber || !productData.name || !productData.price || !productData.quantityAvailable) {
      throw new Error('All fields are required');
    }

    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(productId, updatedData) {
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (!updatedData.lotNumber || !updatedData.name || !updatedData.price || !updatedData.quantityAvailable) {
      throw new Error('All fields are required');
    }

    await product.update(updatedData);
    return product;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    await product.destroy();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
