const express = require('express')
const router = express.Router()
const Recipe = require('../src/Recipe/Model/recipe')
const viewDir = './src/Recipe/views/'

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

        res.render(viewDir+'main.ejs', { pigs: pigs, others: others})
    } catch(err) {
        res.render(viewDir+'error.ejs')
    }
})

router.get('/:title', async (req, res)=> {
    try {
        const recipe = await Recipe.findOne({ title:req.params.title })
        if(recipe==null) {
            res.redirect("/recipe")
        } else {
            res.render(viewDir+'detailView.ejs', { recipe: recipe})
        }
    } catch (err) {
        res.render(viewDir+'error.ejs')
    }
})

// Handles url error
router.use(function(e, req, res, next) {
    res.redirect("/recipe")
});

module.exports = router