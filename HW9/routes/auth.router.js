const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');
const {
    paramName,
    userConstants: { REFRESH_TOKEN_TYPE }
} = require('../config');

router.post(
    '/',
    authMiddleware.validateLoginUser,
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    authMiddleware.throwIfUserNotPresent,
    authController.loginUser
);

router.post(
    '/logout',
    authMiddleware.validateToken(),
    authController.logout
);

router.post(
    '/refresh',
    authMiddleware.validateToken(REFRESH_TOKEN_TYPE),
    authController.refresh
);

module.exports = router;
