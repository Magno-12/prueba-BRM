/**
 * @api {post} /purchase Create a Purchase
 * @apiName CreatePurchase
 * @apiGroup Purchase
 */
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/', purchaseController.createPurchase);

module.exports = router;
