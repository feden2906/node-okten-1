const { emailActions } = require('../config');

module.exports = {
    [emailActions.CREATE]: {
        templateName: 'create',
        subject: 'Welcome!'
    }
};
