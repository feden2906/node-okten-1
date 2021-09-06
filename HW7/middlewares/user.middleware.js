const { User } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { errorMessage, statusCodes } = require('../config');
const { userValidator } = require('../validators');

module.exports = {
    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await User.findOne({ [dbField]: value });

            req.user = user;

            console.log(req.user);
            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.USER_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserDinamic: (validatorsName, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = userValidator[validatorsName].validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoleAndID: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser, user } = req;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(loginUser.role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
            }

            if (loginUser._id.toString() === user._id.toString()) {
                return next();
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
