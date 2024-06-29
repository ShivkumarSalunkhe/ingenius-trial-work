const express = require('express');
const { createPayment, getPayments } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', createPayment);
router.get('/', getPayments);

module.exports = router;
