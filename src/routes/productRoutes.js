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
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", () => {
  productController.getAllProducts;
});

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
router.post("/", () => {
  productController.createProduct;
});

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
router.put("/:id", () => {
  productController.updateProduct;
});

/**
 * @api {delete} /products/:id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Products
 *
 * @apiParam {Number} id Product ID to delete.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 204 No Content
 */
router.delete("/:id", () => {
  productController.deleteProduct;
});

module.exports = router;
