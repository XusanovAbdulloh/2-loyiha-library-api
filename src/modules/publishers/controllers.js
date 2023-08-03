const httpValidator = require("../../shared/http-validator");
const createPublisherr = require("./create-publisher");
const { listPublisherSchema, showPublisherSchema, patchPublisherSchema, deletePublisherSchema, postPublisherSchema } = require("./schemas");
const listPublishers = require("./list-publishers");
const getPublisher = require("./show-publishers");
const patchPublisher = require("./update-publisher");
const removePublisher = require("./delete-publisher");

const createPublisher = async (req, res) => {  
    try {
      httpValidator({ body: req.body }, postPublisherSchema);

      const result = await createPublisherr(req.body);
  
      res.status(201).json({
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };

  const getPublishers = async (req, res) => {
  
    try {
      httpValidator({ query: req.query }, listPublisherSchema);
      const data = await listPublishers(req.query);
  
      res.status(200).json({
        data: data,
      });
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };

  const getPublisherById = async (req, res) => {  
    try {
      httpValidator({ params: req.params }, showPublisherSchema);

      const data = await getPublisher(req.params);
  
      res.json({
        data: data,
      });
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };

  const updatePublisher = async (req, res) => {
    try {
      httpValidator({ body: req.body, params: req.params }, patchPublisherSchema);

      const data = await patchPublisher({id: req.params.id,changes: req.body });
  
      res.status(201).json({
        data: data,
      });
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };
  
  
  const deletePublisher = async (req, res) => {
    try {
      httpValidator({ params: req.params }, deletePublisherSchema);

    await removePublisher(req.params);
  
      res.json({ message: 'Publisher deleted successfully' });
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };


  module.exports = {
    createPublisher,
    updatePublisher,
    getPublisherById,
    getPublishers,
    deletePublisher
  }