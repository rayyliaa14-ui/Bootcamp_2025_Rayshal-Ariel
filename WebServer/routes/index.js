const express = require('express');
const router = express.Router();
const { loadContact } = require('../func');

router.get('/', async(req, res) => {
  const contacts_db = await loadContact();
  res.render('index', {
    name: 'rayshal',
    title: 'Webserver EJS',
    layout: 'layout/main-layouts',
    contact: contacts_db
  });
});

module.exports = router;
