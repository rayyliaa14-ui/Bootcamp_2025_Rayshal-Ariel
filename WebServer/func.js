const fs = require('fs');

// cek folder 
const folPath = './data';
// if(!fs.existsSync(folPath)){
//     fs.mkdirSync(folPath);
// }

const filePath = './data/contact.json';
// if(!fs.existsSync(filePath)){
//     fs.writeFileSync(filePath,'[]','utf-8');
// };

//buat load data parsing
const loadContact = () => {
    const fileData = fs.readFileSync('./data/contact.json','utf-8');
    const contactData = JSON.parse(fileData);
    return contactData;
}

const saveContact = (name,email,mobile) => {
    data_input = {name,email,mobile};
    const contacts = loadContact();
    //cek apakah ada duplikasi
    const duplicate = contacts.find((c) => c.name === name);
    if(duplicate){
        return {valid: false, message: "Your name already exist"};
    }
    //cek email
    const validate = require('validator');
    if(email){
        if(!validate.isEmail(email)){
            return {valid: false, message: "Your email isnt valid"};
        }
    }
    //cek hp
    if(mobile){
        if(!validate.isMobilePhone(mobile,'id-ID')){
            return {valid: false, message: "Your number isnt valid"};
        }
    }
    console.log(mobile);
    contacts.push(data_input);
    fs.writeFileSync(filePath,JSON.stringify(contacts,null, 2));
    console.log("data saved to json ---");
    return {valid: true};
} 


module.exports = { loadContact, saveContact};



