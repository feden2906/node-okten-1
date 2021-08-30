const passwordService = require('../service/password.service');
const { userValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes, errorMessage } = require('../config');
const { User } = require('../dataBase');

module.exports = {
    validateLoginUser: (req, res, next) => {
        try {
            const { error } = userValidator.loginUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_EMAIL_OR_PASSWORD);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkPassword: async (req, res, next) => {
        try {
            const { user } = req;
            const { password } = req.body;

            await passwordService.compare(user.password, password);

            next();
        } catch (e) {
            next(e);
        }
    }
};
