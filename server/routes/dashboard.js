import express from 'express';
import Product from '../models/Product.js';
import Transaction from '../models/Transaction.js';
import Supplier from '../models/Supplier.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const [
      totalProducts,
      lowStockProducts,
      totalSuppliers,
      recentTransactions,
      inventoryValue
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({
        $expr: { $lte: ['$stock', '$lowStockThreshold'] }
      }),
      Supplier.countDocuments(),
      Transaction.find().populate('product').sort({ createdAt: -1 }).limit(5),
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $multiply: ['$stock', '$price'] } }
          }
        }
      ])
    ]);

    const stats = {
      totalProducts,
      lowStockProducts,
      totalSuppliers,
      recentTransactions,
      inventoryValue: inventoryValue[0]?.totalValue || 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/alerts', async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    }).populate('supplier');
    
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;