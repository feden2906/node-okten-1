const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.validateUserBody, userMiddleware.checkUniqueEmail, userController.createUser);
router.get('/:user_id', userMiddleware.isUserPresent, userController.getSingleUser);

module.exports = router;
