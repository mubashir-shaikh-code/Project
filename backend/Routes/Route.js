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
} = require('../Controllers/Controller.js');

const { protect } = require('../Middleware.js'); // ✅ fix the path

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/my-products/:userId', getUserProducts);
router.post('/product', protect, postProduct); // ✅ protected route
router.get('/adminapi/pending-products', getPendingProducts);
router.put('/adminapi/approve-product/:id', approveProduct);
router.get('/approved-products', getApprovedProducts);

module.exports = router;
