const Joi = require('joi');
const { userConstants, userRolesEnum } = require('../config');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim()
        .required(),
    email: Joi.string().regex(userConstants.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(userConstants.PASSWORD_REGEXP).trim().required(),
    bornYear: Joi.number().min(userConstants.CURRENT_YEAR - 120).max(userConstants.CURRENT_YEAR - 6),
    role: Joi.string().allow(...Object.values(userRolesEnum)),
    car: Joi.boolean()
});

const updateUserValidator = Joi.object({
    name: Joi.string().trim().alphanum().min(2)
        .max(30),
    email: Joi.string().regex(userConstants.EMAIL_REGEXP)
});

const loginUserValidator = Joi.object({
    email: Joi.string().regex(userConstants.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(userConstants.PASSWORD_REGEXP).trim().required(),
});

module.exports = {
    createUserValidator,
    loginUserValidator,
    updateUserValidator
};
