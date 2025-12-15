// =======================
// IMPORT
// =======================
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');

// utils
const {
  loadContact,
  saveContact,
  addContact,
  validationData,
  delData
} = require('./func');

// =======================
// INIT APP
// =======================
const app = express();
const port = 3000;

// =======================
// VIEW ENGINE
// =======================
app.set('view engine', 'ejs');
app.use(expressLayout);

// =======================
// GLOBAL MIDDLEWARE
// =======================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// request logger
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log(`request catch : ${req.method} ${req.url}`);
  next();
});

// =======================
// HELPER FUNCTIONS
// =======================
const findContact = (name) => {
  const contacts = loadContact();
  return contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
};

const isDuplicateName = (name) => {
  const contacts = loadContact();
  return contacts.find(
    c => c.name.toLowerCase() === name.toLowerCase()
  );
};

const isDuplicateEmail = (email) => {
  const contacts = loadContact();
  return contacts.find(
    c => c.email?.toLowerCase() === email.toLowerCase()
  );
};

const isDuplicateMobile = (mobile) => {
  const contacts = loadContact();
  return contacts.find(
    c => c.mobile === mobile
  );
};

// =======================
// ROUTES
// =======================

// HOME
app.get('/', (req, res) => {
  res.render('index', {
    name: 'rayshal',
    title: 'Webserver EJS',
    layout: 'layout/main-layouts',
    contact: [
      { name: 'ray', email: 'ray@gmail.com' },
      { name: 'sal', email: 'sal@yahoo.com' },
      { name: 'ariel', email: 'ariel@try.com' }
    ]
  });
});

// CONTACT LIST
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact EJS',
    layout: 'layout/main-layouts',
    nama: 'ray',
    contact: loadContact()
  });
});

// ADD PAGE
app.get('/contact/add', (req, res) => {
  res.render('add', {
    layout: 'layout/main-layouts',
    title: 'Add data',
    errno: 'Add new data',
    contact: ''
  });
});

// ADD DATA
app.post(
  '/contact',
  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .custom(value => {
        if (isDuplicateName(value)) {
          throw new Error('Contact name already exists');
        }
        return true;
      }),

    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is not valid'),

    body('mobile')
      .notEmpty().withMessage('Phone is required')
      .isMobilePhone('id-ID')
      .withMessage('Mobile number is not valid'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('add', {
        layout: 'layout/main-layouts',
        title: 'Add data',
        errno: errors.array()[0].msg,
        contact: ''
      });
    }

    addContact(req.body);
    res.redirect('/contact');
  }
);

// app.post('/contact', (req, res) => {
//   const validation = validationData(req.body);
//   if (!validation.valid) {
//     return res.render('add', {
//       layout: 'layout/main-layouts',
//       title: 'Add data',
//       errno: validation.message
//     });
//   }
//   addContact(req.body);
//   res.redirect('/contact');
// });

// DETAIL
app.get('/contact/:name', (req, res) => {
  res.render('detail', {
    layout: 'layout/main-layouts',
    title: 'Detail Contact',
    contact: findContact(req.params.name)
  });
});

// UPDATE PAGE
app.get('/contact/update/:name', (req, res) => {
  res.render('add', {
    layout: 'layout/main-layouts',
    title: 'Detail Contact',
    errno: 'Wanna update ur data?',
    contact: findContact(req.params.name)
  });
});

// DELETE
app.get('/contact/delete/:name', (req, res) => {
  const contact = findContact(req.params.name);

  if (!contact) {
    return res.status(404).send('404');
  }

  delData(req.params.name);
  res.redirect('/contact');
});

// ABOUT
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layout/main-layouts',
    title: 'About EJS'
  });
});

// TESTER
app.get('/tester', (req, res) => {
  res.render('tester', {
    layout: 'layout/main-layouts',
    title: 'Tester Web'
  });
});

// TEST POST
app.post('/result', (req, res) => {
  res.send(`Nama yang dikirim: ${req.body.name}`);
});

// PRODUK
app.get('/produk/:id', (req, res) => {
  res.send(`
    product ID = ${req.params.id}
    <br> category = ${req.query.category}
  `);
});

// =======================
// 404 HANDLER
// =======================
app.use((req, res) => {
  res.status(404).send('page not found');
});

// =======================
// START SERVER
// =======================
app.listen(port, () => {
  console.log(`Example app listening on port [${port}]`);
});
