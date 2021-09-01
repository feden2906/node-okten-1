const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const {
    dbField,
    paramName,
    searchIn,
    userRolesEnum
} = require('../config');

router.get(
    '/',
    userController.getAllUsers
);
router.post(
    '/',
    userMiddleware.validateUserBody,
    userMiddleware.checkUniqueEmail,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.isUserPresentByDynmicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userController.getSingleUser
);
router.delete(
    '/:user_id',
    userMiddleware.isUserPresentByDynmicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.checkUserRoleMdlwr([userRolesEnum.ADMIN]),
    userController.deleteUser
);
router.put(
    '/:user_id',
    userMiddleware.isUserPresentByDynmicParam(paramName.user.USER_ID, searchIn.PARAMS, dbField._ID),
    userMiddleware.checkUniqueEmail,
    userMiddleware.validateUpdateUser,
    userController.updateUser
);

module.exports = router;
