const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.route("/").get(commentController.getAllComments);

router
  .route('/:id')
  .get(commentController.getComment);

module.exports = router;
