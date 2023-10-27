const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", async (req, res) => {
  try {
    //Sequelize query to get all categories
    const categoryData = await Category.findAll({
      //Grab all products associated with each category
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    //Sequelize query to get specific category
    const categoryData = await Category.findByPk(
      req.params.id,
      {
        include: [{ model: Product }],
      }
      //Grab all products associated with the selected category
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract category_name from the request body
    const { category_name } = req.body;

    // Create a new category
    const newCategory = await Category.create({
      category_name,
    });

    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Extract category_name from the request body
    const { category_name } = req.body;

    // Update the category by id
    const updatedCategory = await Category.update(
      { category_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({ message: "Category updated successfully", updatedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete selected category by id
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Category deleted successfully", deletedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete category" });
  }
});

module.exports = router;
