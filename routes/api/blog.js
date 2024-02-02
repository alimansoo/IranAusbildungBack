const express = require('express');
const router = express.Router();
const blogsController = require('../../controllers/blogsController');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(blogsController.getAllBlogs)
    .post(blogsController.insertBlog)
    //.get(verifyRoles(ROLES_LIST.Admin), blogsController.getAllUsers)
    // .delete(verifyRoles(ROLES_LIST.Admin), blogsController.deleteUser);

router.route('/:id')
    .get(blogsController.getBlog)
    .delete(blogsController.deleteBlog)
دذ
module.exports = router;