const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> { 
    const recipes = [{
        title: 'YOUR mum'
    }, {
        title: 'my mum'
    }]
    res.render('./src/Recipe/search.ejs', { recipes: recipes});
});

module.exports = router