const express = require('express');
const router = express.Router();
const tagsController = require('../../controllers/tagsController');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(tagsController.getAllTags)
    .post(tagsController.insertTag)
    //.get(verifyRoles(ROLES_LIST.Admin), tagsController.getAllUsers)
    // .delete(verifyRoles(ROLES_LIST.Admin), tagsController.deleteUser);

router.route('/:id')
    .get(tagsController.getTag)
    .delete(tagsController.deleteTag)

module.exports = router;