const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 255 },
  lastName: { type: String, required: true, maxlength: 255 },
  number: { type: Number, required: true, min: 10 },
  email: { type: String, required: true, maxlength: 255 },
  country: { type: String, required: true, maxlength: 255 },
  mm: { type: Number, required: true },
  yy: { type: Number, required: true },
  cardName: { type: String, required: true, maxlength: 255 },
  cardNumber: { type: Number, required: true },
  cvc: { type: Number, required: true }
});

module.exports = mongoose.model('Payment', PaymentSchema);
