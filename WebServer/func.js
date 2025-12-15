const fs = require('fs');
const validator = require('validator');

const filePath = './data/contact.json';

// load data
const loadContact = () => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// save all contacts
const saveContact = (contacts) => {
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
};

// VALIDASI DATA
const validationData = (contact_input) => {
  const contacts = loadContact();

  // duplicate name
  const duplicate = contacts.find(
    c => c.name.toLowerCase() === contact_input.name.toLowerCase() ||
    c.email.toLowerCase() === contact_input.toLowerCase() || 
    c.mobile === contact_input.mobile
  );

  if (duplicate) {
    return { valid: false, message: 'Your data already exists' };
  }

  // email
  if (contact_input.email) {
    if (!validator.isEmail(contact_input.email)) {
      return { valid: false, message: 'Your email is not valid' };
    }
  }

  // mobile
  if (contact_input.mobile) {
    if (!validator.isMobilePhone(contact_input.mobile, 'id-ID')) {
      return { valid: false, message: 'Your number is not valid' };
    }
  }
  return { valid: true };
};

// ADD CONTACT
const addContact = (contact_input) => {
  const contacts = loadContact();
  contacts.push(contact_input);
  saveContact(contacts);
  return { valid: true };
};

//fungsi delete
const delData = (name) => {
    const contact = loadContact();
    const contactNew = contact.filter(
        (c) => c.name.toLowerCase() !== name.toLowerCase());
    saveContact(contactNew);
}

module.exports = { loadContact, addContact, validationData, delData };
