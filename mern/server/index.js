import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5000;

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    quantity: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

const CartItem = mongoose.model('CartItem', cartItemSchema);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/cart', async (_req, res, next) => {
  try {
    const items = await CartItem.find().sort({ createdAt: 1 });
    res.json({ items });
  } catch (error) {
    next(error);
  }
});

app.post('/api/cart', async (req, res, next) => {
  try {
    const { productId, title, price, image } = req.body;
    if (!productId || !title || typeof price !== 'number') {
      return res.status(400).json({ message: 'Missing product fields.' });
    }

    const existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.json({ item: existing });
    }

    const item = await CartItem.create({ productId, title, price, image, quantity: 1 });
    res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
});

app.patch('/api/cart/:id', async (req, res, next) => {
  try {
    const { action } = req.body;
    if (!['increment', 'decrement'].includes(action)) {
      return res.status(400).json({ message: 'Action must be increment or decrement.' });
    }

    const item = await CartItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    if (action === 'increment') {
      item.quantity += 1;
    } else if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      await item.deleteOne();
      return res.json({ item: null, removed: true });
    }

    await item.save();
    res.json({ item });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/cart/:id', async (req, res, next) => {
  try {
    const removed = await CartItem.findByIdAndDelete(req.params.id);
    res.json({ removed: Boolean(removed) });
  } catch (error) {
    next(error);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error.' });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

start();

