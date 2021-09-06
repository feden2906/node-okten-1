const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../config');
const { userRolesEnum } = require('../config');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    bornYear: {
        type: Number
    }
}, { timestamps: true });

module.exports = model(dbTablesEnum.USER, userSchema);
