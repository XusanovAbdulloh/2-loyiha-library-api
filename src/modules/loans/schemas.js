const Joi = require("joi");

const postLoanSchema = Joi.object({
    book: Joi.string().required(),
    out_date: Joi.date().iso().required(),
    borrower: Joi.string().required(),
})

module.exports = {postLoanSchema}