const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/ausbildungsController');

router.route('/')
    .get(Controller.getAll)
    .post(Controller.insert)

router.route('/:id')
    .get(Controller.get)
    .delete(Controller.delete)

router.route('/like/:q')
    .get(Controller.likeBy)

router.route('/save')
    .post(Controller.save)

module.exports = router;