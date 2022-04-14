const {joiSchema, statusJoiSchema} = require('./contact');
const {
  userSignupJoiSchema,
  userLoginJoiSchema,
  userUpdateSubscriptionSchema,
} = require('./user');

module.exports = {
  joiSchema,
  statusJoiSchema,
  userSignupJoiSchema,
  userLoginJoiSchema,
  userUpdateSubscriptionSchema,
};
