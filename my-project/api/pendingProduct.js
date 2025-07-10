import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://MuhammadMubashir:Matz@project.lbrheme.mongodb.net/test';

let cachedConn = null;

async function connectDB() {
  if (cachedConn) return cachedConn;

  cachedConn = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return cachedConn;
}

// Define Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  userId: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  }
});

// Avoid model overwrite in hot-reload
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();
    const products = await Product.find({ status: 'pending' });
    return res.status(200).json(products);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Error fetching pending products' });
  }
}
