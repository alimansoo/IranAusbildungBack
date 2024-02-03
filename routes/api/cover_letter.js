const express = require('express');
const router = express.Router();
const coverLetterController = require('../../controllers/coverLetterController');

router.route('/')
    .get(coverLetterController.getAllCoverLetters)
    .post(coverLetterController.insertCoverLetter)

router.route('/:id')
    .get(coverLetterController.getCoverLetter)
    .delete(coverLetterController.Delete)

module.exports = router;