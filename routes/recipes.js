const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> { 
    const recipes = [{
        title: 'YOUR mum',
        description: 'This is a beaty to enjoy there is 100s asdfsadf',
        cookTime: 10
    }, {
        title: 'my mum'
    }]
    res.render('./src/Recipe/views/search.ejs', { recipes: recipes});
});

module.exports = router