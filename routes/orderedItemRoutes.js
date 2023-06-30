const express = require("express");
const orderedItemController = require("../controllers/orderedItemController");
const authController = require('../controllers/authController');

const router = express.Router();

router.route("/unpaid").get(authController.protect, orderedItemController.getUnpaidItems);

router.route("/")
    .get(authController.protect, orderedItemController.getOrderedItem)
    .post(authController.protect, orderedItemController.createOrderedItem);

router
    .route("/:id")
    .patch(authController.protect, orderedItemController.updateOrderedItem)

module.exports = router;
