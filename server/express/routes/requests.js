const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

//for contact us
router.post('/create', requestController.createRequest);

module.exports = router;