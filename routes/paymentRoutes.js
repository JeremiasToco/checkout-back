const express = require('express');
const { body, validationResult } = require('express-validator');
const Payment = require('../models/Payment');
const router = express.Router();

router.post('/payments', async (req, res) => {

  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: 'Pagamento registrado com sucesso!', payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar no banco de dados.' });
  }
});

router.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar os pagamentos.' });
    }
});
  

module.exports = router;
