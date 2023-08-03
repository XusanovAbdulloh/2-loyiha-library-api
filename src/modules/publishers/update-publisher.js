const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const patchPublisher = async ({ id, changes }) => {
  const existing = await Publisher.findOne({ _id: id });
  console.log(id);
  if (!existing){ 
    throw new NotFoundError("Publisher not found")
}

  const updated = Publisher.findByIdAndUpdate(id, changes);
  return updated;
};
module.exports = patchPublisher;