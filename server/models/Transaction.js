import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  type: {
    type: String,
    enum: ['purchase', 'sale'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Calculate total value
transactionSchema.virtual('totalValue').get(function() {
  return this.quantity * this.price;
});

transactionSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Transaction', transactionSchema);