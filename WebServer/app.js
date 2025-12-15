const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
const { loadContact, addContact, delData } = require('./func');

const app = express();
const port = 3000;

// View engine
app.set('view engine', 'ejs');
app.use(expressLayout);

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log(`Request catch: ${req.method} ${req.url}`);
  next();
});

// Helper functions
const findContact = (name) => {
  const contacts = loadContact();
  return contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
};

const isDuplicateName = (name) => {
  const contacts = loadContact();
  return contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
};

// Routes

// Home
app.get('/', (req, res) => {
  res.render('index', {
    name: 'rayshal',
    title: 'Webserver EJS',
    layout: 'layout/main-layouts',
    contact: loadContact()
  });
});

// Contact list
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact EJS',
    layout: 'layout/main-layouts',
    contact: loadContact()
  });
});

// Add contact page
app.get('/contact/add', (req, res) => {
  res.render('add', {
    layout: 'layout/main-layouts',
    title: 'Add Contact',
    errno: '',
    contact: null
  });
});

// Add contact post
app.post(
  '/contact',
  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .custom(value => {
        if (isDuplicateName(value)) throw new Error('Contact name already exists');
        return true;
      }),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is not valid'),
    body('mobile')
      .notEmpty().withMessage('Phone is required')
      .isMobilePhone('id-ID').withMessage('Mobile number is not valid')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('add', {
        layout: 'layout/main-layouts',
        title: 'Add Contact',
        errno: errors.array()[0].msg,
        contact: req.body
      });
    }

    addContact(req.body);
    res.redirect('/contact');
  }
);

// Contact detail
app.get('/contact/:name', (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) return res.status(404).send('Contact not found');

  res.render('detail', {
    layout: 'layout/main-layouts',
    title: 'Detail Contact',
    contact
  });
});

// Update page (reuses add.ejs)
app.get('/contact/update/:name', (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) return res.status(404).send('Contact not found');

  res.render('add', {
    layout: 'layout/main-layouts',
    title: 'Update Contact',
    errno: 'Update your contact info',
    contact
  });
});

// Delete contact
app.get('/contact/delete/:name', (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) return res.status(404).send('Contact not found');

  delData(req.params.name);
  res.redirect('/contact');
});

// About
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layout/main-layouts',
    title: 'About EJS'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
