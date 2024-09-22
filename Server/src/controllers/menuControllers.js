const Menu = require("../models/Menu");

// get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a menu item
const postMenuItem = async (req, res) => {
  const newMenu = req.body;
  try {
    const result = await Menu.create(newMenu);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a menu item
const deleteMenu = async (req, res) => {
    const menuId = req.params.id;
    // console.log(menuId);

    try {
        const deletedMenu = await Menu.findByIdAndDelete(menuId);
        // console.log(deletedMenu);

        if (!deletedMenu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        res.status(200).json({ message: "Menu Item Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// find a single menu item
const singleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {

        const menu = await Menu.findById(menuId);
        // console.log(menu);
        res.status(200).json(menu);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update a menu item
const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    console.log(menuId)
  const { _id, name, recipe, image, category, price, createdAt} = req.body;
  // console.log(req.body)
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
        menuId,
      {  name, recipe, image, category, price},
      { new: true, runValidators: true }
    );

    console.log(updatedMenu)

    if (!updatedMenu) {
      return res.status(404).json({ message: "updated Item not found" });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItem,
  deleteMenu,
  singleMenuItem,
  updateMenuItem
};
