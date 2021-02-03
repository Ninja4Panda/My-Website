const express = require('express')
const router = express.Router()
const Recipe = require('../src/Recipe/Model/recipe')

router.get('/', async (req, res)=> { 
    try {
        const recipes = await Recipe.find()
        console.log(recipes)
        res.render('./src/Recipe/views/search.ejs', { recipes: recipes})
    } catch(err) {
        res.render('./src/Recipe/views/error.ejs')
    }
})

router.get('/:id', (req, res)=> {
    res.render('./src/Recipe/views/error.ejs')
})

module.exports = router