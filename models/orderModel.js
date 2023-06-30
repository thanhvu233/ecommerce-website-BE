const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Order must belong to a user!"],
    },
    total: {
        type: Number,
        required: [true, "Order must have total."],
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    paid: {
        type: Boolean,
        default: false,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
