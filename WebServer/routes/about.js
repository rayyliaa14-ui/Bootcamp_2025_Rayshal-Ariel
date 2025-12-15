const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('about', {
    layout: 'layout/main-layouts',
    title: 'About EJS'
  });
});

module.exports = router;