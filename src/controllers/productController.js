const purchaseService = require('../services/purchaseService');

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
