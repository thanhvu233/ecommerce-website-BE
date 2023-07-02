const OrderedItem = require('../models/orderedItemModel');
const catchAsync = require('../utils/catchAsync');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1. Get the unpaid ordered items
    const orderedItems = await OrderedItem.find({
        order: req.params.id,
    });

    const lineItems = orderedItems.map(({ amount, product }) => ({
        price_data: {
            currency: 'usd',
            unit_amount: product.price * 100,
            product_data: {
                name: product.productName,
                description: product.description,
                images: product.images,
            },
        },
        quantity: amount,
    }));

    // 2. Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${process.env.FE_HOSTNAME}/checkout-success/${req.params.id}`,
        cancel_url: `${req.protocol}://${process.env.FE_HOSTNAME}/cart`,
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        mode: 'payment',
        line_items: lineItems,
        shipping_address_collection: {
            allowed_countries: ['US', 'VN'],
        },
        shipping_options: [
            {
                shipping_rate: 'shr_1NP7ufKSjjjBfTlGRC2mbFQB',
            },
        ],
    });

    // 3. Create session as response
    res.status(200).json({
        status: 'success',
        data: session,
    });
});
