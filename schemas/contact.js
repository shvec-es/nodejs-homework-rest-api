const Joi = require('joi');

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.bool().default(false),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.bool().default(false),
});

module.exports = {joiSchema, statusJoiSchema};
