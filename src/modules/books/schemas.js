const Joi = require("joi");
const { pageSchema, buildSortSchema } = require("../../shared/pagenatsion");

module.exports.postBookSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    publisher: Joi.string().required(),
    author: Joi.string().required(),
    copies: Joi.number().required(),
    is_deleted: Joi.boolean().default(false),
  }),
};

module.exports.showBookSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

module.exports.listBookSchema = {
  query: Joi.object({
    sort: buildSortSchema(["id", "copies"]),
    page: pageSchema,
    filters: {
      is_deleted: Joi.boolean(),
    },
  }),
};

module.exports.patchBookSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    title: Joi.string(),
    publisher: Joi.string(),
    author: Joi.string(),
    copies: Joi.number(),
  }),
};

module.exports.deleteBookSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};