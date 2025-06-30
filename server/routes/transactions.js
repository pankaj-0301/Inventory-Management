import express from 'express';
import Transaction from '../models/Transaction.js';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('product')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { product: productId, type, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (type === 'sale' && product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const transaction = new Transaction(req.body);
    await transaction.save();

    if (type === 'purchase') {
      product.stock += quantity;
    } else if (type === 'sale') {
      product.stock -= quantity;
    }
    await product.save();

    await transaction.populate('product');
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const product = await Product.findById(transaction.product);
    if (product) {
      if (transaction.type === 'purchase') {
        product.stock -= transaction.quantity;
      } else if (transaction.type === 'sale') {
        product.stock += transaction.quantity;
      }
      await product.save();
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;