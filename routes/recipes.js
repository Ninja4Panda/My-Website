const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('./src/Recipe/search.ejs', {});
});

module.exports = router