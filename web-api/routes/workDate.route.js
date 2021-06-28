const express = require('express');
const WorkDate = require('../controllers/workDate.controller');
const router = express.Router();

// workDate
router.post('/v1/createWorkData', WorkDate.createData);

module.exports = router;

/**
 * Route
 *      https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 */
