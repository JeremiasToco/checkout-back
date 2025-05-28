const express = require('express');
const { body, validationResult } = require('express-validator');
const Payment = require('../models/Payment');
const router = express.Router();

router.post('/payments', [
  body('firstName')
    .isString().withMessage('O nome deve ser uma string.')
    .isLength({ max: 255 }).withMessage('O nome não pode ter mais de 255 caracteres.')
    .notEmpty().withMessage('O nome é obrigatório.'),

  body('lastName')
    .isString().withMessage('O sobrenome deve ser uma string.')
    .isLength({ max: 255 }).withMessage('O sobrenome não pode ter mais de 255 caracteres.')
    .notEmpty().withMessage('O sobrenome é obrigatório.'),

  body('number')
    .isNumeric().withMessage('O número deve ser um valor numérico.')
    .custom(val => val.toString().length >= 10).withMessage('O número deve ter pelo menos 10 dígitos.')
    .notEmpty().withMessage('O número é obrigatório.'),

  body('email')
    .isEmail().withMessage('O e-mail deve ser válido.')
    .isLength({ max: 255 }).withMessage('O e-mail não pode ter mais de 255 caracteres.')
    .notEmpty().withMessage('O e-mail é obrigatório.'),

  body('country')
    .isString().withMessage('O país deve ser uma string.')
    .isLength({ max: 255 }).withMessage('O país não pode ter mais de 255 caracteres.')
    .notEmpty().withMessage('O país é obrigatório.'),

  body('mm')
    .isNumeric().withMessage('O mês deve ser um valor numérico.')
    .custom(val => val.toString().length === 2).withMessage('O mês deve ter exatamente 2 dígitos.')
    .notEmpty().withMessage('O mês é obrigatório.'),

  body('yy')
    .isNumeric().withMessage('O ano deve ser numérico.')
    .custom(val => val.toString().length === 2).withMessage('O ano deve ter exatamente 2 dígitos.')
    .notEmpty().withMessage('O ano é obrigatório.'),

  body('cardName')
    .isString().withMessage('O nome no cartão deve ser uma string.')
    .isLength({ max: 255 }).withMessage('O nome no cartão não pode ter mais de 255 caracteres.')
    .notEmpty().withMessage('O nome no cartão é obrigatório.'),

  body('cardNumber')
    .isNumeric().withMessage('O número do cartão deve ser numérico.')
    .custom(val => val.toString().length === 16).withMessage('O número do cartão deve ter exatamente 16 dígitos.')
    .notEmpty().withMessage('O número do cartão é obrigatório.'),

  body('cvc')
    .isNumeric().withMessage('O CVC deve ser numérico.')
    .custom(val => val.toString().length === 3).withMessage('O CVC deve ter exatamente 3 dígitos.')
    .notEmpty().withMessage('O CVC é obrigatório.')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

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
