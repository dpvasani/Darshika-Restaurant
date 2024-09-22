import Carts from "../models/Carts.js";

// Get carts using email
export const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email };

    // Extra for JWT verification
    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
      return res.status(403).json({ message: "Forbidden access!" });
    }

    const result = await Carts.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post all carts
export const addToCarts = async (req, res) => {
  const { name, recipe, image, price, email, quantity, menuItemId } = req.body;

  try {
    // Check if menuItemId already exists in the database
    const existingCartItem = await Carts.findOne({ email, menuItemId });

    if (existingCartItem) {
      // If menuItemId exists, send a message and do not create a new cart item
      return res
        .status(403)
        .json({ message: "Product already exists in the cart." });
    }

    // If menuItemId doesn't exist, create a new cart item
    const cartItem = await Carts.create({
      name,
      recipe,
      image,
      price,
      email,
      quantity,
      menuItemId,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a cart
export const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart Items not found" });
    }

    res.status(200).json({ message: "Cart Items Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart quantity
export const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { name, recipe, image, price, email, quantity, menuItemId } = req.body;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { name, recipe, image, price, email, quantity, menuItemId },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single cart item
export const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Cart Item not found" });
  }
};
