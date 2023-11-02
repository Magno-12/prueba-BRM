const purchaseService = require('../services/purchaseService');
const { getUserRole } = require('../services/authService');

/**
 * @api {post} /purchase Create a Purchase
 * @apiName CreatePurchase
 * @apiGroup Purchase
 *
 * @apiParam {Object} purchaseData Purchase data.
 * @apiParam {Number} purchaseData.products Array of product IDs and quantities.
 *
 * @apiSuccess {String} message Confirmation message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Purchase successfully registered"
 *     }
 *
 * @apiError PurchaseFailed Purchase creation failed.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Purchase creation failed"
 *     }
 */
exports.createPurchase = async (req, res) => {
  try {
    const userRole = getUserRole(req);

    if (userRole !== 'client') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const purchaseData = req.body;
    const userId = req.userId;
    const message = await purchaseService.createPurchase(purchaseData, userId);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @api {get} /purchases List Purchases
 * @apiName ListPurchases
 * @apiGroup Purchases
 *
 * @apiSuccess {Object[]} purchases List of purchases.
 * @apiSuccess {Number} purchases.id Purchase ID.
 * @apiSuccess {Date} purchases.date Date of the purchase.
 * @apiSuccess {Object} purchases.customer Details of the customer (user).
 * @apiSuccess {Object[]} purchases.products List of products in the purchase.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "date": "2023-11-02T12:00:00.000Z",
 *         "customer": {
 *           "id": 1,
 *           "username": "john_doe",
 *           "email": "john@example.com",
 *           "role": "client"
 *         },
 *         "products": [
 *           {
 *             "id": 1,
 *             "name": "Product 1",
 *             "price": 10.99,
 *             "purchaseDetails": {
 *               "quantity": 2,
 *               "price": 10.99
 *             }
 *           },
 *           {
 *             "id": 2,
 *             "name": "Product 2",
 *             "price": 19.99,
 *             "purchaseDetails": {
 *               "quantity": 1,
 *               "price": 19.99
 *             }
 *           }
 *         ]
 *       },
 *       // ...
 *     ]
 */
exports.listPurchases = async (req, res) => {
  try {
    const userRole = getUserRole(req);

    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const purchases = await purchaseService.listPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
