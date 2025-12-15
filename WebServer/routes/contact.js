const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { loadContact, addContact, delData, updateData } = require('../func');
const { route } = require('.');

// Helper
const findContact = (name) => {
  const contacts = loadContact();
  return contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
};

const isDuplicateName = (name) => {
  const contacts = loadContact();
  return contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
};

//          <== / contact list / ==>
router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact EJS',
    layout: 'layout/main-layouts',
    contact: loadContact()
  });
});

//          <== / contact add / ==>
router.get('/add', (req, res) => {
  res.render('add', {
    layout: 'layout/main-layouts',
    title: 'Add Contact',
    errno: '',
    contact: null
  });
});

//          <== / contact add [post] / ==>
router.post(
  '/',
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

//          <== / contact Update / ==>
router.get('/update/:name', (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact){
    return res.status(404).send('Contact not found');
  } 
  res.render('update', {
    layout: 'layout/main-layouts',
    title: 'Update Contact',
    errno: 'Update your contact info',
    contact
  });
});
///       ------==>
router.post(
  '/update',
  [
    body('name')
      .notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is not valid'),
    body('mobile')
      .notEmpty().withMessage('Phone is required')
      .isMobilePhone('id-ID').withMessage('Mobile number is not valid')
  ],
  (req, res) => {
    const contact_input = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error");
      return res.render('update', {
        layout: 'layout/main-layouts',
        title: 'Add Contact',
        errno: errors.array()[0].msg,
        contact: req.body
      });
    }
    updateData(contact_input);
    res.redirect('/contact');
  }
);

//          <== / contact detail / ==>
router.get('/:name', (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact){
     return res.status(404).send('Contact not found');
  }
  res.render('detail', {
    layout: 'layout/main-layouts',
    title: 'Detail Contact',
    contact
  });
});


//          <== / contact delete / ==>
router.get('/delete/:name', (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) return res.status(404).send('Contact not found');

  delData(req.params.name);
  res.redirect('/contact');
});

module.exports = router;