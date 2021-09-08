const { emailActions } = require('../config');

module.exports = {
    [emailActions.CREATE]: {
        templateName: 'create',
        subject: 'Welcome!'
    },
    [emailActions.DELETED_BY_USER]: {
        templateName: 'deleted',
        subject: 'You deleted your account'
    },
    [emailActions.DELETED_BY_ADMIN]: {
        templateName: 'deletedByAdmin',
        subject: 'Your account deleted by admin'
    }
};
