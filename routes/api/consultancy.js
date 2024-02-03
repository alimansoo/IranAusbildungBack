const express = require('express');
const router = express.Router();
const consultancyController = require('../../controllers/consultancyController');

router.route('/')
    .get(consultancyController.getAllConsultancies)
    .post(consultancyController.insertConsultancy)

router.route('/:id')
    .get(consultancyController.getConsultancy)
    .delete(consultancyController.Delete)

module.exports = router;