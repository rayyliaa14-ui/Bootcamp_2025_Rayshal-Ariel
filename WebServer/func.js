const fs = require('fs');

// cek folder 
const folPath = './data';
// if(!fs.existsSync(folPath)){
//     fs.mkdirSync(folPath);
// }

const filePath = './data/contacts.json';
// if(!fs.existsSync(filePath)){
//     fs.writeFileSync(filePath,'[]','utf-8');
// };

//buat load data parsing
const loadContact = () => {
    const fileData = fs.readFileSync('./data/contact.json','utf-8');
    const contactData = JSON.parse(fileData);
    return contactData;
}

// buat list data
const list_Data = () => {
    const contacts = loadContact();
    contacts.forEach((contacts,i) => {

    })
}

module.exports = {list_Data, loadContact};