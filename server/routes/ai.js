import express from 'express';
import Product from '../models/Product.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("SDG",GEMINI_API_KEY);
router.post('/reorder-suggestions', async (req, res) => {
  try {
    const { productId } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const transactions = await Transaction.find({ product: productId })
      .sort({ createdAt: -1 })
      .limit(10);

    const salesTransactions = transactions.filter(t => t.type === 'sale');
    const totalSales = salesTransactions.reduce((sum, t) => sum + t.quantity, 0);
    const avgMonthlySales = salesTransactions.length > 0 ? 
      Math.ceil(totalSales / Math.max(1, salesTransactions.length)) : 1;

    const prompt = `Based on the following inventory data, suggest an optimal reorder quantity:

Product: ${product.name}
Current Stock: ${product.stock}
Low Stock Threshold: ${product.lowStockThreshold}
Recent Sales Transactions: ${salesTransactions.length}
Average Monthly Sales: ${avgMonthlySales}
Category: ${product.category || 'General'}

Consider factors like:
- Current stock level vs threshold
- Sales velocity
- Lead time buffer
- Economic order quantity principles

Provide a brief analysis and recommended reorder quantity in JSON format:
{
  "recommendedQuantity": number,
  "reasoning": "brief explanation",
  "urgency": "low/medium/high"
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const aiData = await response.json();
    const aiText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    let suggestion;
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        suggestion = JSON.parse(jsonMatch[0]);
      } else {
        suggestion = {
          recommendedQuantity: Math.max(product.lowStockThreshold * 2, avgMonthlySales * 2),
          reasoning: "Based on sales history and stock threshold",
          urgency: product.stock <= product.lowStockThreshold ? "high" : "low"
        };
      }
    } catch (parseError) {
      suggestion = {
        recommendedQuantity: Math.max(product.lowStockThreshold * 2, avgMonthlySales * 2),
        reasoning: "Calculated based on current stock and sales patterns",
        urgency: product.stock <= product.lowStockThreshold ? "high" : "low"
      };
    }

    res.json({
      product: {
        name: product.name,
        currentStock: product.stock,
        threshold: product.lowStockThreshold
      },
      suggestion,
      salesData: {
        recentTransactions: salesTransactions.length,
        avgMonthlySales
      }
    });

  } catch (error) {
    console.error('AI suggestion error:', error);
    res.status(500).json({ error: 'Failed to get AI suggestions' });
  }
});

export default router;