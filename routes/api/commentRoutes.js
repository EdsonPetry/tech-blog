const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../config/middleware/isAuthenticated");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a comment by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
