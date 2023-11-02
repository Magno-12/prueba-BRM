const productService = require('../services/productService');

/**
 * @api {get} /products List Products
 * @apiName GetAllProducts
 * @apiGroup Products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @api {post} /products Create a New Product
 * @apiName CreateProduct
 * @apiGroup Products
 */
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @api {put} /products/:id Update Product
 * @apiName UpdateProduct
 * @apiGroup Products
 */
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;
    const message = await productService.updateProduct(productId, updatedData);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @api {delete} /products/:id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Products
 */
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
