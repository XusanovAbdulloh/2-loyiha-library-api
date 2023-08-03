const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const getPublisher = async ({ id }) => {
  const publisher = await Publisher.findOne({ _id: id });

  if (!publisher) {
    throw new NotFoundError("Publisher not found");
  }

  return publisher;
};

module.exports = getPublisher;