const Joi = require('joi');

const borrowerSchema = Joi.object({
  full_name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
});
const borrowerEditSchema = Joi.object({
  full_name: Joi.string(),
  address: Joi.string(),
  phone: Joi.string(),
});

module.exports ={ borrowerSchema, borrowerEditSchema};
