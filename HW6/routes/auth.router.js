const router = require('express').Router();

const { authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

router.post('/',
    authMiddleware.validateLoginUser,
    authMiddleware.isEmailExist,
    authMiddleware.checkPassword,
    authController.loginUser);

module.exports = router;
