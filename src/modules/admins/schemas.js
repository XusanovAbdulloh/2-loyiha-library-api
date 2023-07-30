const Joi = require('joi');

const adminSchema = Joi.object({
  full_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const adminLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  

module.exports = {adminSchema, adminLoginSchema}

