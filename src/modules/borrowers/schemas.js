const Joi = require("joi");
const { pageSchema, buildSortSchema } = require("../../shared/pagenatsion");

module.exports.postBorrowerSchema = {
  body: Joi.object({
    full_name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    is_deleted: Joi.boolean().default(false),
  }),
};

module.exports.showBorrowerSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

module.exports.listBorrowerSchema = {
  query: Joi.object({
    sort: buildSortSchema(["id", "full_name"]),
    page: pageSchema,
    filters: {
      is_deleted: Joi.boolean(),
    },
  }),
};

module.exports.patchBorrowerSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    full_name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

module.exports.deleteBorrowerSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};