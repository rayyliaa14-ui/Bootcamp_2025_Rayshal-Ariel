const express = require('express');
const router = express.Router();
const { loadContact } = require('../func');

router.get('/', (req, res) => {
  res.render('index', {
    name: 'rayshal',
    title: 'Webserver EJS',
    layout: 'layout/main-layouts',
    contact: loadContact()
  });
});

module.exports = router;