const Joi = require('joi');

const publisherSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
});
const publisherEditSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  phone: Joi.string(),
});

module.exports ={ publisherSchema, publisherEditSchema};
