const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/checkout-session/:id',
  authController.protect,
  checkoutController.getCheckoutSession
);

module.exports = router;
