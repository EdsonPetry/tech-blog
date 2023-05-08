const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../config/middleware/isAuthenticated");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
