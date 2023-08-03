const Joi = require("joi");
const { pageSchema, buildSortSchema } = require("../../shared/pagenatsion");

exports.postPublisherSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    is_deleted: Joi.boolean().default(false),
  }),
};

exports.showPublisherSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.listPublisherSchema = {
  query: Joi.object({
    q: Joi.string(),
    page: pageSchema,

    sort: buildSortSchema(["is_deleted"]),
    filters: {
      is_super: Joi.boolean(),
    },
  }),
};

exports.patchPublisherSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

exports.deletePublisherSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};