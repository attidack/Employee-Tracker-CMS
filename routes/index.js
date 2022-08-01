const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./empRoutes'));

module.exports = router;