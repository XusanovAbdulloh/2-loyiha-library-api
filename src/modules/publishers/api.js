const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggen-in");
const { createPublisher, getPublishers, getPublisherById, updatePublisher, deletePublisher } = require("./controllers");

const router = express.Router();

router.post("/publishers", isLoggedIn, createPublisher);
router.get("/publishers", isLoggedIn, getPublishers);
router.get("/publishers/:id", isLoggedIn, getPublisherById);
router.patch("/publishers/:id", isLoggedIn,  updatePublisher);
router.delete("/publishers/:id", isLoggedIn, deletePublisher);

module.exports = router