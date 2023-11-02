const purchaseService = require('../services/purchaseService');

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
    const purchaseData = req.body;
    const userId = req.userId;
    const message = await purchaseService.createPurchase(purchaseData, userId);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
