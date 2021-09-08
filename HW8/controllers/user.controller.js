const { User } = require('../dataBase');
const { emailActions, statusCodes } = require('../config');
const { passwordService, emailService } = require('../service');
const { userNormalizator } = require('../utils');
const { USER } = require('../config/user.roles.enum');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const userToNorm = userNormalizator.userNormalizator(req.user);

            res.json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            const usersToNorm = users.map((user) => userNormalizator.userNormalizator(user));

            res.json(usersToNorm);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);
            const createdUser = await User.create({ ...req.body, password: hashedPassword });

            const userToNorm = userNormalizator.userNormalizator(createdUser);

            await emailService.sendMail(userToNorm.email, emailActions.CREATE, { userName: userToNorm.name });

            res.status(statusCodes.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user, params: { user_id } } = req;

            await User.deleteOne({ _id: user_id });

            if (user.role === USER) {
                await emailService.sendMail(
                    user.email,
                    emailActions.DELETED_BY_USER,
                    { userName: user.name }
                );
            } else {
                await emailService.sendMail(
                    user.email,
                    emailActions.DELETED_BY_ADMIN,
                    { userName: user.name }
                );
            }

            res.status(statusCodes.DELETED).json(`User with id ${user_id} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(user_id, req.body);

            const userToNorm = userNormalizator.userNormalizator(updatedUser);

            await emailService.sendMail(
                userToNorm.email,
                emailActions.UPDATE,
                { userName: userToNorm.name }
            );

            res.status(statusCodes.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    }
};
