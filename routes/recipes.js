const express = require('express')
const router = express.Router()
const Recipe = require('../src/Recipe/Model/recipe')

router.get('/', async (req, res)=> { 
    try {
        const pigs = []
        const others = []
        const recipes = await Recipe.find()
        recipes.forEach(recipe => {
            switch(recipe.type) {
                case "pig":
                    pigs.push(recipe)
                    break;
                case "other":
                    others.push(recipe)
                    break;
                default:
                    break;
            }
        });

        res.render('./src/Recipe/views/search.ejs', { pigs: pigs, others: others})
    } catch(err) {
        res.render('./src/Recipe/views/error.ejs')
    }
})

router.get('/:id', (req, res)=> {
    res.render('./src/Recipe/views/error.ejs')
})

module.exports = router