const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const Product = require('../Models/Product');

const JWT_SECRET = 'your_jwt_secret'; // Use environment variable in production

// Generate JWT Token
// const generateToken = (user) => {
//   return jwt.sign({user}, JWT_SECRET, { expiresIn: '1d' });
// };
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
};


// Admin & User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Admin login (no DB check)
  if (email === 'admin@ecom.com' && password === 'admin123') {
    return res.status(200).json({ role: 'admin' });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      return res.status(200).json({
        role: 'user',
        token,
        user,
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, image } = req.body;
  

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password, image });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Get Logged-in User's Products
exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user products' });
  }
};

// Post Product (Protected Route)
exports.postProduct = async (req, res) => {
  const { name, price, imageUrl} = req.body;
  const userId = req.user.id;

  try {
    const product = new Product({ name, price, imageUrl, userId, status: 'pending' });
    await product.save();
    res.status(201).json({ message: 'Product submitted for approval' });
  } catch (err) {
    res.status(500).json({ message: 'Error posting product' });
  }
};

// Admin: Get All Pending Products
exports.getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'pending' });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending products' });
  }
};

// Admin: Approve Product
exports.approveProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.status(200).json({ message: 'Product approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving product' });
  }
};

// Get All Approved Products (Public)
exports.getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'approved' });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching approved products' });
  }
};
