const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51KvC7YCi1P9Fgl9IYeT0V7IYRWKH5JrbE5ChtAwhPDvbmRirNnysl7h4LYn7CEfbIsOGHELS0YbgpJBwqkHx873j00dhFP6jnH"
);

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = () => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 9000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "mxn",
    automatic_payment_methods: {
      enabled: true,
    },
    transfer_group: "ORDER_95",
  });

  // ------------------------------

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// // Create a Transfer to the connected account (later):
// const transfer = await stripe.transfers.create({
//   amount: 7000,
//   currency: "mxn",
//   destination: "acct_1KvC7YCi1P9Fgl9I",
//   transfer_group: "ORDER_95",
// });

app.listen(4242, () => console.log("Node server listening on port 4242!"));
