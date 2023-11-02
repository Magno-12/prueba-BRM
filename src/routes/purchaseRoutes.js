/**
 * @api {post} /purchase Create a Purchase
 * @apiName CreatePurchase
 * @apiGroup Purchase
 */
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/', purchaseController.createPurchase);

/**
 * @api {get} /purchase List Purchases
 * @apiName ListPurchases
 * @apiGroup Purchase
 *
 * @apiSuccess {Object[]} purchases List of purchases.
 * @apiSuccess {Number} purchases.id Purchase ID.
 * @apiSuccess {String} purchases.date Purchase date.
 * @apiSuccess {Number} purchases.customerId Customer ID.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "id": 1,
 *       "date": "2023-11-02T12:00:00Z",
 *       "customerId": 123
 *     },
 *     {
 *       "id": 2,
 *       "date": "2023-11-03T14:30:00Z",
 *       "customerId": 456
 *     }
 *   ]
 */
router.get('/', purchaseController.listPurchases);

module.exports = router;
