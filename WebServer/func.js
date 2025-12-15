const fs = require('fs');
const validator = require('validator');

const filePath = './data/contact.json';

// Load all contacts
const loadContact = () => {
  const fileData = fs.readFileSync(filePath,'utf-8');
    const contactData = JSON.parse(fileData); 
    return contactData;
};

// Save all contacts
const saveContact = (contacts) => {
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
};

// Validation
const validationData = (contact_input) => {
  const contacts = loadContact();

  // Duplicate check
  const duplicate = contacts.find(
    c => c.name.toLowerCase() === contact_input.name.toLowerCase() ||
      (contact_input.email && c.email.toLowerCase() === contact_input.email.toLowerCase()) ||
      (contact_input.mobile && c.mobile === contact_input.mobile)
  );

  if (duplicate) return { valid: false, message: 'Your data already exists' };

  // Email check
  if (contact_input.email && !validator.isEmail(contact_input.email)) {
    return { valid: false, message: 'Your email is not valid' };
  }

  // Mobile check
  if (contact_input.mobile && !validator.isMobilePhone(contact_input.mobile, 'id-ID')) {
    return { valid: false, message: 'Your number is not valid' };
  }

  return { valid: true };
};

// Add contact
const addContact = (contact_input) => {
  const contacts = loadContact();
  contacts.push(contact_input);
  saveContact(contacts);
};

// Delete contact
const delData = (name) => {
  const contacts = loadContact();
  const filtered = contacts.filter(c => c.name.toLowerCase() !== name.toLowerCase());
  saveContact(filtered);
};

//update contact 
const updateData = (data_input) => { 
  const contacts = loadContact();
  const contactIndex = contacts.findIndex(
    (c) => c.name.toLowerCase() === data_input.oldName.toLowerCase());
    if(contactIndex === -1) return false;
const newData = {
  name:data_input.name,
  email:data_input.email,
  mobile:data_input.mobile
};
contacts[contactIndex] = newData;
saveContact(contacts);

return true;
}

module.exports = { loadContact, addContact, validationData, delData, updateData };
