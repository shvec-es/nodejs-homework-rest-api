const Joi = require('joi');

const userSignupJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().min(6).required(),
  subscription: Joi.string()
      .default('starter')
      .valid('starter', 'pro', 'business'),
  token: Joi.string().default(null),
  avatarURL: Joi.string().required(),
});

const userLoginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().min(6).required(),
});

const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid('starter', 'pro', 'business'),
});
module.exports = {
  userSignupJoiSchema,
  userLoginJoiSchema,
  userUpdateSubscriptionSchema,
};
