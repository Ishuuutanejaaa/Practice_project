const express = require("express");
const router = express.Router();  // Corrected: add parentheses to create the router instance
const { getNewsletter, createNewsletter } = require("../controllers/newsletterController");

router.get("/", getNewsletter);
router.post("/",  createNewsletter);

module.exports = router;  // Corrected: ensure router is exported correctly
