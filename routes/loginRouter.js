const express = require('express');
const crypto = require('crypto');

const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;

// referencia crypto module: https://www.w3schools.com/nodejs/ref_crypto.asp
