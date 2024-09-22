import Menu from "../models/Menu.js";

// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post a menu item
export const postMenuItem = async (req, res) => {
  const newMenu = req.body;
  try {
    const result = await Menu.create(newMenu);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item
export const deleteMenu = async (req, res) => {
  const menuId = req.params.id;
  try {
    const deletedMenu = await Menu.findByIdAndDelete(menuId);

    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json({ message: "Menu Item Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a single menu item
export const singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu Item not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const { name, recipe, image, category, price } = req.body;
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, recipe, image, category, price },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Updated Item not found" });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
