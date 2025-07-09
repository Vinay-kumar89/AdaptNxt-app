import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, text: true },
    description: { type: String },
    category: { type: String, index: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
