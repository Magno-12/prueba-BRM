const Product = require('../models/Product');

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
      throw new Error('Todos los campos son obligatorios');
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
      throw new Error('Producto no encontrado');
    }

    if (!updatedData.lotNumber || !updatedData.name || !updatedData.price || !updatedData.quantityAvailable) {
      throw new Error('Todos los campos son obligatorios');
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
      throw new Error('Producto no encontrado');
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
