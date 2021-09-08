const { OAuth } = require('../dataBase');
const { statusCodes, userConstants: { AUTHORIZATION }, emailActions } = require('../config');
const { passwordService, jwtService, emailService } = require('../service');
const { userNormalizator } = require('../utils');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            const userToNorm = userNormalizator.userNormalizator(user);

            await emailService.sendMail(
                userToNorm.email,
                emailActions.AUTH,
                { userName: userToNorm.name }
            );

            res.json({
                ...tokenPair,
                user: userToNorm
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.status(statusCodes.DELETED).json('OK');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { refresh_token } = req.get(AUTHORIZATION);
            const user = req.loginUser;

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            const userToNorm = userNormalizator.userNormalizator(user);

            res.json({
                ...tokenPair,
                user: userToNorm
            });
        } catch (e) {
            next(e);
        }
    },

};
