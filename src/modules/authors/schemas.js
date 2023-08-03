const Joi = require("joi");
const { pageSchema, buildSortSchema } = require("../../shared/pagenatsion");

module.exports.postAuthorSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

module.exports.showAuthorSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

module.exports.listAuthorSchema = {
  query: Joi.object({
    sort: buildSortSchema(["name", "id"]),
    page: pageSchema,
    filters: {
      is_deleted: Joi.boolean(),
    },
  }),
};

module.exports.patchAuthorSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string(),
  }),
};

module.exports.deleteAuthorSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};