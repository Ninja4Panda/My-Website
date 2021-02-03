const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    Marination: {
        type: String
    },
    ingredient: {
        type: String,
        require: true
    },
    steps: {
        type: String,
        require: true
    },
    difficulty: {
        type: String,
        required:true
    },
    proPic: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Recipe', recipeSchema);