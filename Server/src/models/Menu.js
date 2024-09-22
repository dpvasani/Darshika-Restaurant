const mongoose = require('mongoose');
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
        default: Date.now
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;