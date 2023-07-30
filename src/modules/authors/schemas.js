const Joi = require("joi");

const authorschema = Joi.object({
    name: Joi.string().required()
})

module.exports = {authorschema}