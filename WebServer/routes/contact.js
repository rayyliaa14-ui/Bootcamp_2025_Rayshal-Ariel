const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { loadContact, addContact, delData, updateData, validationData } = require('../func');
const { route } = require('.');

// Helper
const findContact = async (name) => {
  const contacts = await loadContact();
  return contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
};

const isDuplicateName = async (name) => {
  const contacts = await loadContact();
  return contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
};

//          <== / contact list / ==>
router.get('/', async (req, res) => {
  const contact_db = await loadContact();
  res.render('contact', {
    title: 'Contact EJS',
    layout: 'layout/main-layouts',
    contact: contact_db
  });
});

//          <== / contact add / ==>
router.get('/add', async (req, res) => {
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
      .custom(async value => {
        const errExist = await isDuplicateName(value);
        if ( errExist ) throw new Error('Contact name already exists');
        return true;
      }),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is not valid'),
    body('mobile')
      .notEmpty().withMessage('Phone is required')
      .isMobilePhone('id-ID').withMessage('Mobile number is not valid')
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    const contacts = await req.body;
    const checkValid = await validationData(contacts);
    if (!errors.isEmpty()) {
      return res.render('add', {
        layout: 'layout/main-layouts',
        title: 'Add Contact',
        errno: errors.array()[0].msg,
        contact: req.body
      });
    }
    await addContact(req.body);
    res.redirect('/contact');
  }
);

//          <== / contact Update / ==>
router.get('/update/:name', async (req, res) => {
  const contact = await findContact(req.params.name);
  console.log(contact);
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
///    Update via post   ------==>
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
  async (req, res) => {
    const contact_input = await req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty() || !updateData(contact_input)) {
      console.log("error");
      return res.render('update', {
        layout: 'layout/main-layouts',
        title: 'Add Contact',
        errno: errors.array().length > 0
          ? errors.array()[0].msg
        : 'Name already used',
        contact: req.body
      });
    }
    res.redirect('/contact');
  }
);

//          <== / contact detail / ==>
router.get('/:name', async (req, res) => {
  const contact = await findContact(req.params.name);
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
router.get('/delete/:name', async (req, res) => {
  const contact = await findContact(req.params.name);
  if (!contact) return res.status(404).send('Contact not found');

  await delData(req.params.name);
  res.redirect('/contact');
});

module.exports = router;