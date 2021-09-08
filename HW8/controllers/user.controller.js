const { User } = require('../dataBase');
const { emailActions, statusCodes } = require('../config');
const { passwordService, emailService } = require('../service');
const { userNormalizator } = require('../utils');

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
            const { password, name } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);
            const createdUser = await User.create({ ...req.body, password: hashedPassword });

            const userToNorm = userNormalizator.userNormalizator(createdUser);

            await emailService.sendMail('alryab4enko@gmail.com', emailActions.CREATE, { userName: name });

            res.status(statusCodes.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await User.deleteOne({ _id: user_id });

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

            res.status(statusCodes.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    }
};
