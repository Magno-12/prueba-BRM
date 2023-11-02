const productService = require('../services/productService');

/**
 * @api {get} /products List Products
 * @apiName ListProducts
 * @apiGroup Products
 *
 * @apiSuccess {Object[]} products List of products.
 * @apiSuccess {Number} products.id Product ID.
 * @apiSuccess {String} products.name Product name.
 * @apiSuccess {Number} products.price Product price.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "id": 1,
 *       "name": "Product 1",
 *       "price": 10.99
 *     },
 *     {
 *       "id": 2,
 *       "name": "Product 2",
 *       "price": 19.99
 *     }
 *   ]
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @api {get} /products List Products
 * @apiName ListProducts
 * @apiGroup Products
 *
 * @apiSuccess {Object[]} products List of products.
 * @apiSuccess {Number} products.id Product ID.
 * @apiSuccess {String} products.name Product name.
 * @apiSuccess {Number} products.price Product price.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "id": 1,
 *       "name": "Product 1",
 *       "price": 10.99
 *     },
 *     {
 *       "id": 2,
 *       "name": "Product 2",
 *       "price": 19.99
 *     }
 *   ]
 */
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @api {put} /products/:id Update Product
 * @apiName UpdateProduct
 * @apiGroup Products
 *
 * @apiParam {Number} id Product ID to update.
 * @apiParam {String} name New product name.
 * @apiParam {Number} price New product price.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Product updated successfully"
 *   }
 */
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;
    const product = await productService.updateProduct(productId, updatedData);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @api {put} /products/:id Update Product
 * @apiName UpdateProduct
 * @apiGroup Products
 *
 * @apiParam {Number} id Product ID to update.
 * @apiParam {String} name New product name.
 * @apiParam {Number} price New product price.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Product updated successfully"
 *   }
 */
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
