const express = require('express');
const orderedItemController = require('../controllers/orderedItemController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/unpaid').get(orderedItemController.getUnpaidItems);

router
  .route('/')
  .get(orderedItemController.getOrderedItem)
  .post(orderedItemController.createOrderedItem)
  .patch(orderedItemController.updateOrderedItems);

router
  .route('/:id')
  .patch(orderedItemController.updateOrderedItem)
  .delete(orderedItemController.deleteOrderedItem);

module.exports = router;
