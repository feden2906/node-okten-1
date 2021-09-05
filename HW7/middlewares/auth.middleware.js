const { ErrorHandler } = require('../errors');
const {
    dbTablesEnum: { USER },
    errorMessage,
    statusCodes,
    userConstants: { ACCESS_TOKEN_TYPE, AUTHORIZATION }
} = require('../config');
const { jwtService } = require('../service');
const { OAuth } = require('../dataBase');

module.exports = {
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
    }
};
