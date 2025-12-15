const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgran = require('morgan');

//Catch data from funct.js
const { loadContact,saveContact } = require('./func');

//function findContact
const findContact = (name) => {
  const contacts = loadContact();
  return contacts.find(c=>c.name.toLowerCase() === name.toLowerCase());
};

const app = express();
const port = 3000;
const fs = require('fs');
const { title } = require('process');
const { error } = require('console');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.use(expressLayout);


// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgran('dev'));

//          <== Route ==>         //

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
  const contact = loadContact();
  res.render('contact', {
    title: "Contact EJS",
    layout: 'layout/main-layouts',
    nama: 'ray',
    contact
  });
});

//route add
app.get('/contact/add',(req,res)=>{
  res.render('add',{
    layout: 'layout/main-layouts',
    title: 'Add Page',
    errno:"hi"
  })
})

//route data - transcive data 
const controllData = (req,res,next) => {
  const {name,email,number} = req.body;
  const resultData = saveContact(name,email,number);
  if(!resultData.valid){ 
    res.render('add',{
      title: 'add page',
      layout: 'layout/main-layouts',
      errno: resultData.message || 'welcome'
    });
  } else {
    res.redirect('/contact');
  }
};

app.post('/contact/add', controllData)


//route get contact to detail
app.get('/contact/:name', (req, res) => {
  const contact = findContact(req.params.name);
  res.render('detail',
    {
      layout:'layout/main-layouts',
      title:'Detail Contact',
      contact: contact,
    }
  );
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
