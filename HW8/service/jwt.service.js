const jwt = require('jsonwebtoken');
const util = require('util');

const {
    errorMessage,
    secretKeys: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY },
    statusCodes,
    userConstants: { ACCESS_TOKEN_TYPE },
} = require('../config');
const { ErrorHandler } = require('../errors');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS_TOKEN_TYPE) => {
        try {
            const secretKey = tokenType === ACCESS_TOKEN_TYPE ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessage.INVALID_TOKEN);
        }
    }

};
