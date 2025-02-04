const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;
