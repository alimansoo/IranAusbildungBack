const express = require('express');
const router = express.Router();
const commentsController = require('../../controllers/commentsController');

router.route('/')
    .get(commentsController.getAllComments)
    .post(commentsController.insertComment)

router.route('/:id')
    .get(commentsController.getComment)
    .delete(commentsController.Delete)

module.exports = router;