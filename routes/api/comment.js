const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/commentsController');

router.route('/')
    .get(Controller.getAll)
    .post(Controller.insert)

router.route('/:id')
    .get(Controller.get)
    .delete(Controller.delete)

module.exports = router;