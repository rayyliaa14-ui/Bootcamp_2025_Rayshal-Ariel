const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 3000;
const fs = require('fs');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.use(expressLayout);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route Home
app.get('/', (req, res) => {
  const contact = [
    { name: 'ray', email: 'ray@gmail.com' },
    { name: 'sal', email: 'sal@yahoo.com' },
    { name: 'ariel', email: 'ariel@try.com' }
  ];

  res.render('index', {
    name: "rayshal",
    title: "Webserver EJS",
    contact,
    layout: 'layout/main-layouts'
  });
});

// Route Contact
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: "Contact EJS",
    layout: 'layout/main-layouts'
  });
});

// Route About
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layout/main-layouts',
    title: "About EJS"
  });
});

// Route Produk
app.get('/produk/:id', (req, res) => {
  res.send(`
    product ID = ${req.params.id} 
    <br> category = ${req.query.category}
  `);
});

// 404 Handler
app.use('/', (req, res) => {
  res.status(404).send('page not found');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port [${port}]`);
});
