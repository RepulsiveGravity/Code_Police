const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const statsController = require('../controllers/statsController');

// Route: GET /api/stats/codeforces
router.get('/:platform', auth, statsController.getStats);

module.exports = router;