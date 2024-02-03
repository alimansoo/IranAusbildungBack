const express = require('express');
const router = express.Router();
const ticketController = require('../../controllers/ticketController');

router.route('/')
    .get(ticketController.getAllTickets)
    .post(ticketController.insertTicket)

router.route('/:id')
    .get(ticketController.getTicket)
    .delete(ticketController.Delete)

module.exports = router;