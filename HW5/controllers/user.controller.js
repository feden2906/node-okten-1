const { User } = require('../dataBase');
const { userNormalizator } = require('../utils/user.normalizator');
const passwordService = require('../service/password.service');
const statusCode = require('../config/status-codes');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const userToNorm = userNormalizator(req.user);

            res.json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            const usersToNorm = users.map((user) => userNormalizator(user));

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

            const userToNorm = userNormalizator(createdUser);

            res.status(statusCode.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await User.deleteOne({ _id: user_id });

            res.status(statusCode.DELETED).json(`User with id ${user_id} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(user_id, req.body);

            const userToNorm = userNormalizator(updatedUser);

            res.status(statusCode.CREATED).json(userToNorm);
        } catch (e) {
            next(e);
        }
    }
};
