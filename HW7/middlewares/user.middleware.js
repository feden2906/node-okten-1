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
                //  throw new Error('not found')
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

    // checkUniqueEmail: async (req, res, next) => {
    //     try {
    //         const { email } = req.body;
    //
    //         const userByEmail = await User.findOne({ email });
    //
    //         if (userByEmail) {
    //             throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
    //         }
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    validateUserDinamic: (validatorsName, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = userValidator[validatorsName].validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_EMAIL_OR_PASSWORD);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoleMdlwr: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
