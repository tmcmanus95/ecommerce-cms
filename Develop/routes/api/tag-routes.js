const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  try {
    //Sequelize query to get all tags
    const tagData = await Tag.findAll({
      //Grab all products associated with each tag
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    //Sequelize query to get specific tag
    const tagData = await Tag.findByPk(
      req.params.id,
      //Grab all products associated with the selected tag
      {
        include: [{ model: Product }],
      }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract tag_name from the request body
    const { tag_name } = req.body;

    // Create a new tag
    const newTag = await Tag.create({
      tag_name,
    });

    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create Tag" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Extract tag_name from the request body
    const { tag_name } = req.body;

    // Update the tag by id
    const updatedTag = await Tag.update(
      { tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({ message: "Tag updated successfully", updatedTag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update tag" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete selected tag by id
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Tag deleted successfully", deletedTag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete tag" });
  }
});

module.exports = router;
