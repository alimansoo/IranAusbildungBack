const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/ausbildungsController');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(Controller.getAllAusbildungs)
    .post(Controller.insertAusbildung)

router.route('/:id')
    .get(Controller.getAusbildung)
    .delete(Controller.Delete)

router.route('/like/:q')
    .get(Controller.getLinkBy)

router.route('/save')
    .post(Controller.saveAusbildung)

module.exports = router;