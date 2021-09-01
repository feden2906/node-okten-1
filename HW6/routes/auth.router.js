const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middlewares');
const { authController } = require('../controllers');
const { validatorsName } = require('../config');

router.post(
    '/',
    userMiddleware.validateUserDinamic(validatorsName.user.loginUser),
    authMiddleware.isEmailExist,
    authMiddleware.checkPassword,
    authController.loginUser
);

module.exports = router;
