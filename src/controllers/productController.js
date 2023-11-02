const Product = require('.../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error in obtaining products' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    if (!productData.lotNumber || !productData.name || !productData.price || !productData.quantityAvailable) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newProduct = await Product.create(productData);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (!updatedData.lotNumber || !updatedData.name || !updatedData.price || !updatedData.quantityAvailable) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    await product.update(updatedData);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
