const Joi = require("joi");

const bookSchema = Joi.object({
    title: Joi.string().required(),
    publisher: Joi.string().required(),
    author: Joi.string().required(),
    copies: Joi.number(),
})

module.exports = {bookSchema}