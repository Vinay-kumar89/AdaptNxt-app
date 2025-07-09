import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [itemSchema],
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
