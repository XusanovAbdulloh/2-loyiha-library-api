const Publisher = require("./Publisher");

const createPublisher = async (req, res) => {
    const { name, address, phone } = req.body;
  
    try {
      const publisher = new Publisher({
        name,
        address,
        phone,
      });
  
      await publisher.save();
  
      res.json(publisher);
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };

  const getPublishers = async (req, res) => {
    const { q, sort, page } = req.query;
    const perPage = 10;
    const currentPage = parseInt(page) || 1;
  
    let query = {};
  
    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }
  
    try {
      const totalCount = await Publisher.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
  
      let sortOption = { name: -1 };
      if (sort && sort === 'name') {
        sortOption = { name: 1 };
      }

      const publishers = await Publisher.find(query)
        .sort(sortOption)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
  
      res.json({ totalPages, currentPage, publishers });
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };

  const getPublisherById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const publisher = await Publisher.findById(id);
  
      if (!publisher) {
        return res.status(404).json({ message: 'not found' });
      }
  
      res.json(publisher);
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };

  const updatePublisher = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone } = req.body;
  
    try {
      const publisher = await Publisher.findById(id);
  
      if (!publisher) {
        return res.status(404).json({ message: 'not found' });
      }
  
      publisher.name = name;
      publisher.address = address;
      publisher.phone = phone;
  
      await publisher.save();
  
      res.json(publisher);
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };
  
  
  const deletePublisher = async (req, res) => {
    const { id } = req.params;
  
    try {
      const publisher = await Publisher.findById(id);
  
      if (!publisher) {
        return res.status(404).json({ message: 'not found' });
      }
  
      publisher.is_deleted = true;
      await publisher.save();
  
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