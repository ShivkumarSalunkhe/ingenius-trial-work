const express = require('express');
const {
  getPlans,
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
} = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/plans', getPlans);
router.post('/', createSubscription);
router.get('/', getSubscription);
router.put('/', updateSubscription);
router.delete('/', cancelSubscription);

module.exports = router;
