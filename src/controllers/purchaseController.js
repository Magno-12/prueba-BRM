const Purchase = require('../models/purchase');

exports.createPurchase = async (req, res) => {
        try {
          const purchaseData = req.body;

          if (!purchaseData.products || !Array.isArray(purchaseData.products) || purchaseData.products.length === 0) {
            return res.status(400).json({ error: 'La compra debe incluir al menos un producto' });
          }

          for (const productData of purchaseData.products) {
            const product = await Product.findByPk(productData.productId);
            if (!product) {
              return res.status(400).json({ error: `Producto con ID ${productData.productId} no encontrado` });
            }
            if (productData.quantity > product.quantityAvailable) {
              return res.status(400).json({ error: `Cantidad insuficiente de ${product.name}` });
            }
          }
          const purchaseInfo = {
            date: new Date(),
            customerId: req.userId,
          };
          const newPurchase = await Purchase.create(purchaseInfo);

          for (const productData of purchaseData.products) {
            await newPurchase.addProduct(productData.productId, {
              through: {
                quantity: productData.quantity,
                price: productData.price,
              },
            });
          }

          for (const productData of purchaseData.products) {
            const product = await Product.findByPk(productData.productId);
            product.quantityAvailable -= productData.quantity;
            await product.save();
          }

          return res.status(201).json({ message: 'Compra registrada con éxito' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al registrar la compra' });
        }
      };
