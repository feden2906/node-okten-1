const { ErrorHandler } = require('../errors');
const {
    dbTablesEnum: { USER },
    errorMessage,
    statusCodes,
    userConstants: { ACCESS_TOKEN_TYPE, AUTHORIZATION }
} = require('../config');
const { jwtService } = require('../service');
const { OAuth } = require('../dataBase');
const { userValidator } = require('../validators');

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

    validateToken: (tokenType = ACCESS_TOKEN_TYPE) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessage.NO_TOKEN);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenFromDB = await OAuth.findOne({ [tokenType]: token }).populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessage.NOT_VALID_TOKEN);
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_EMAIL_OR_PASSWORD);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
