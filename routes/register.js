const express = require('express');
const router = express.Router();
const Controller = require('../controllers/usersController');

router.post('/', Controller.insert);

module.exports = router;