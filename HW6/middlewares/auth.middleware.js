const { passwordService } = require('../service');
const { ErrorHandler } = require('../errors');
const { statusCodes, errorMessage } = require('../config');
const { User } = require('../dataBase');

module.exports = {
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

            await passwordService.compare(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    }
};
