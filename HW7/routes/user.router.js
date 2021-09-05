const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const {
    dbField,
    paramName,
    searchIn,
    userRolesEnum, validatorsName
} = require('../config');

router.get(
    '/',
    userController.getAllUsers
);
router.post(
    '/',
    userMiddleware.validateUserDinamic(validatorsName.user.createUser),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.throwIfUserPresent,
    // userMiddleware.checkUniqueEmail,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.getUserByDynamicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.throwIfUserNotPresent,
    userController.getSingleUser
);
router.delete(
    '/:user_id',
    userMiddleware.getUserByDynamicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.throwIfUserNotPresent,
    userMiddleware.checkUserRoleMdlwr([userRolesEnum.ADMIN]),
    userController.deleteUser
);
router.put(
    '/:user_id',
    userMiddleware.getUserByDynamicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.throwIfUserNotPresent,
    // userMiddleware.checkUniqueEmail,
    userMiddleware.validateUserDinamic(validatorsName.user.updateUser),
    userController.updateUser
);

module.exports = router;
