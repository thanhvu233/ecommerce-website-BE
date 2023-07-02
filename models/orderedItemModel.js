const mongoose = require('mongoose');

const orderedItemSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: [true, 'Ordered item must belong to an Order!'],
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Ordered item must be a product!'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Ordered item must be ordered by an user!'],
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
    status: {
        type: String,
        default: 'pending',
        enum: {
            values: ['pending', 'checkout', 'deliver'],
            message: 'Status is either: pending, checkout, deliver',
          },
    },
});

orderedItemSchema.pre(/^find/, function (next) {
    this.populate('order').populate({
        path: 'product',
        select: 'productName images price description'
    });
  
    next();
  });

const OrderedItem = mongoose.model('OrderedItem', orderedItemSchema);

module.exports = OrderedItem;
