const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

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
    userMiddleware.isUserPresentByDynmicParam('user_id', 'params', '_id'),
    userController.getSingleUser
);
router.delete(
    '/:user_id',
    userMiddleware.isUserPresentByDynmicParam('user_id', 'params', '_id'),
    userMiddleware.checkUserRoleMdlwr(['admin']),
    userController.deleteUser
);
router.put(
    '/:user_id',
    userMiddleware.isUserPresentByDynmicParam('user_id', 'params', '_id'),
    userMiddleware.checkUniqueEmail,
    userController.updateUser
);

module.exports = router;
