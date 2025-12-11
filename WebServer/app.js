const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgran = require('morgan');

const app = express();
const port = 3000;
const fs = require('fs');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.use(expressLayout);


// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgran('dev'));


app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.use((req,res,next) => {
  console.log(`request catch : ${req.method} ${req.url}`);
  next();
})

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
app.get('/about', (req, res, next) => {
  res.render('about', {
    layout: 'layout/main-layouts',
    title: "About EJS"
  });
});

//Route testing !!
app.get('/tester',(req,res)=>{
  res.render('tester',{
    layout: 'layout/main-layouts',
    title: 'Tester Web'
  })
})

//Route Tester!!
app.post('/result', (req, res) => {
  const name = req.body.name;  // Ambil data 'name' dari body request
  res.send(`Nama yang dikirim: ${name}`);
});

// Route Produk
app.get('/produk/:id', (req, res) => {
  res.send(`
    product ID = ${req.params.id} 
    <br> category = ${req.query.category}
  `);
});

// 404 Handler - middleware
app.use('/', (req, res) => {
  res.status(404).send('page not found');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port [${port}]`);
});
