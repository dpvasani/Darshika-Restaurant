# Mongoose Models

Here are all my Mongoose models.

## Payment Model

```javascript
import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  transitionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  itemsName: Array,
  cartItems: Array,
  menuItems: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment; // Use 'export default' instead of 'module.exports'
```

## Cart Model

```javascript
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
```

## Menu Model

```javascript
import mongoose from "mongoose";
const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  category: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu; // Use 'export default' instead of 'module.exports'
```

## User Model

```javascript
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
export default User; // Use 'export default' instead of 'module.exports'
```

```

### Additional Notes

1. **Ensure Consistency**: Make sure that all models follow the same structure and conventions, especially regarding data types and required fields.
2. **Referencing Other Models**: If you plan to reference `Menu` items in the `Payment` or `Cart` models, consider using Mongoose's `ObjectId` to create relationships.
3. **Data Validation**: You might want to add validation rules to ensure data integrity.

Feel free to adjust any details or add further explanations as needed!
```
