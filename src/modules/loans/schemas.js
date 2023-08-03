const Joi = require("joi");
const { pageSchema, buildSortSchema } = require("../../shared/pagenatsion");

module.exports.postLoanSchema = {
  body: Joi.object({
    book: Joi.string().required(),
    due_date: Joi.date().iso().required(),
    borrower: Joi.string().required(),
  }),
};

module.exports.showLoanSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

module.exports.listLoanSchema = {
  query: Joi.object({
    sort: buildSortSchema(["out_date", "due_date"]),
    page: pageSchema,
    filters: {
      book: Joi.string().required(),
      borrower: Joi.string().required(),
      status: Joi.string().required(),
    },
  }),
};
