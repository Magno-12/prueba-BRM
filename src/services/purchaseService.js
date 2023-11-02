const Purchase = require('../models/purchase');
const Product = require('../models/product');
const User = require('../models/user');

async function createPurchase(purchaseData, userId) {
  try {
    if (!purchaseData.products || !Array.isArray(purchaseData.products) || purchaseData.products.length === 0) {
      throw new Error('The purchase must include at least one product');
    }

    for (const productData of purchaseData.products) {
      const product = await Product.findByPk(productData.productId);
      if (!product) {
        throw new Error(`Product with ID ${productData.productId} not found`);
      }
      if (productData.quantity > product.quantityAvailable) {
        throw new Error(`Insufficient quantity of ${product.name}`);
      }
    }

    const purchaseInfo = {
      date: new Date(),
      customerId: userId,
    };
    const newPurchase = await Purchase.create(purchaseInfo);

    for (const productData of purchaseData.products) {
      await newPurchase.addProduct(productData.productId, {
        through: {
          quantity: productData.quantity,
          price: productData.price,
        },
      });

      const product = await Product.findByPk(productData.productId);
      product.quantityAvailable -= productData.quantity;
      await product.save();
    }

    return 'Purchase successfully registered';
  } catch (error) {
    throw error;
  }
}

async function listPurchases() {
  try {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'username', 'email', 'role'],
        },
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'price'],
          through: { attributes: ['quantity', 'price'] },
        },
      ],
    });

    return purchases;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPurchase,
  listPurchases,
};
