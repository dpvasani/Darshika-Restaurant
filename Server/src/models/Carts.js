import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  menuItemId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  price: Number,
  quantity: Number,
  email: {
    type: String,
    trim: true,
    required: true,
  },
});

const Carts = mongoose.model("Cart", cartSchema);

export default Carts; // Use 'export default' instead of 'module.exports'
