const Publisher = require("./Publisher");

const createPublisherr = async (data) => {
  const result = await Publisher.create({
    ...data,
  });

  return result;
};

module.exports = createPublisherr;