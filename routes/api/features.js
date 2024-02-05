const express = require('express');
const router = express.Router();
const featuresController = require('../../controllers/featuresController');

router.route('/')
    .get(featuresController.getAllFeatures)
    .post(featuresController.insertFeature)

router.route('/:id')
    .get(featuresController.getFeature)
    .delete(featuresController.Delete)

module.exports = router;