const express = require('express');
const router = express.Router();
const Recipe = require('../src/Recipe/Model/recipe');

router.get('/', async (req, res)=> { 
    const recipes = await Recipe.find()
    console.log(recipes)
    res.render('./src/Recipe/views/search.ejs', { recipes: recipes});
});

router.get('/:id', (req, res)=> {

})

module.exports = router