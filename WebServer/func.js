const fs = require("fs");
const validator = require("validator");

const pool = require("./config/db_connect");

const filePath = "./data/contact.json";

//Muat data - fix
const loadContact = async () => {
  try {
    const contact_db = await pool.query(`SELECT * FROM contacts`);
    return contact_db.rows;
  } catch (error) {
    console.log("Something goes off? hold on");
  }
};

// Save all contacts - fix
const addContact = async (contact_input) => {
  try {
    const save_db = await pool.query(
      `INSERT INTO contacts VALUES (
    '${contact_input.name}',
    '${contact_input.email}',
    '${contact_input.mobile}') RETURNING *`
    );
    return save_db;
  } catch (error) {
    console.log("Something goes off? hold on");
  }
};

// Validation - fix
const validationData = async (contact_input) => {
  try {
    const contacts = await loadContact();
    // Duplicate check
    const duplicate = await contacts.find(
      (c) =>
        (c.name &&
          contact_input.name &&
          c.name.toLowerCase() === contact_input.name.toLowerCase()) ||
        (contact_input.email &&
          c.email &&
          c.email.toLowerCase() === contact_input.email.toLowerCase()) ||
        (contact_input.mobile && c.mobile && c.mobile === contact_input.mobile)
    );
    // console.log(contact_input.name);
    // console.log(duplicate);
    if (duplicate) return { valid: false, message: "Your data already exists" };
    // Email check
    if (contact_input.email && !validator.isEmail(contact_input.email)) {
      return { valid: false, message: "Your email is not valid" };
    }
    // Mobile check
    if (
      contact_input.mobile &&
      !validator.isMobilePhone(contact_input.mobile, "id-ID")
    ) {
      return { valid: false, message: "Your number is not valid" };
    }
    return { valid: true };
  } catch (error) {
    console.log("Something goes off? hold on");
  }
};

// Delete contact
const delData = async (name) => {
  try{
    const contacts = await loadContact();
    const filtered = await contacts.filter(
    (c) => c.name.toLowerCase() !== name.toLowerCase()
    );
    const delCont = await pool.query(
    `DELETE FROM contacts WHERE name='${name}' RETURNING*`
    );
    return delCont;
  } catch(error){
    console.log("Something goes off! Lemme fix it.");
  }
  
};

//update contact
const updateData = async (data_input) => {
  try{
    const contacts = await loadContact();
    const findSameName = contacts.findIndex(
    (c) => c.name.toLowerCase() === data_input.name.toLowerCase()
    );
    if (findSameName !== -1) return false;
      // console.log(data_input.name);
      const contactIndex = contacts.findIndex(
      (c) => c.name.toLowerCase() === data_input.oldName.toLowerCase()
      );
    if (contactIndex === -1) return false;
      const UpdateContact = await pool.query(
      `UPDATE contacts SET 
      name='${data_input.name}',
      email='${data_input.email}',
      mobile='${data_input.mobile}' WHERE name='${data_input.oldName}'`
  );
  return UpdateContact;
  } catch(error){
    console.log("Something goes off, lemme fix it!");
  }
};

module.exports = {
  loadContact,
  addContact,
  validationData,
  delData,
  updateData,
};
