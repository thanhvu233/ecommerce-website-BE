const mongoose = require('mongoose');

const orderedItemSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: [true, 'Ordered item must belong to an Order!'],
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: [true, 'Ordered item must be a product!'],
    },
    amount: {
        type: Number,
        required: [true, 'Ordered item must have amount.'],
    },
    subTotal: {
        type: Number,
        required: [true, 'Ordered item must have price.'],
    },
    size: {
        type: String,
        required: [true, 'Ordered item must have size.'],
    },
    paid: {
        type: Boolean,
        default: false,
    },
});

orderedItemSchema.pre(/^find/, function (next) {
    this.populate('order');
  
    next();
  });

const OrderedItem = mongoose.model('OrderedItem', orderedItemSchema);

module.exports = OrderedItem;
