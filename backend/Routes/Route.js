const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProducts,
  postProduct,
  getPendingProducts,
  approveProduct,
  getApprovedProducts
} = require('../Controllers/Controller');

const { protect } = require('../Middleware'); // ✅ fix the path

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/my-products/:userId', getUserProducts);
router.post('/product', protect, postProduct); // ✅ protected route
router.get('/admin/pending-products', getPendingProducts);
router.put('/admin/approve-product/:id', approveProduct);
router.get('/approved-products', getApprovedProducts);

module.exports = router;
