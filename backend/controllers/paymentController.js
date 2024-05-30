const catchAsyncErrors = require("../middleware/catchAsyncError");
const dotenv=require("dotenv")

dotenv.config()



dotenv.config({path:"backend/config/config.env"})


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "INR",
    metadata: {
      company: "Alibaba",
    },
   
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLIC_KEY });
  });
