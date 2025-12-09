//deklarasu fs as filesystem
const fs = require('fs');

//cek apakah folder sudah pernah dibuat
const folPath = './data';
if(!fs.existsSync(folPath)){
    fs.mkdirSync(folPath);
}

//cek apakah file sudah pernah dibuat?
const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath,'[]','utf-8');
}

//fungsi buat list
 const loadContact = () => {
    const fileData = fs.readFileSync(filePath,'utf-8');
    const contactData = JSON.parse(fileData); 
    // console.log(contactData); --debug only
    return contactData;
 }

//buat fungsi saveContact untuk simpan kontak ke file JSON
const saveContact = (data_input) =>{
    const contactData = loadContact();
    // cek apakah ada dup
    const duplicate = contactData.find((contact) => contact.name === data_input.name);
    if(duplicate){
        console.log("already exist");
        return false
    } 
    //cek email
    const validate = require('validator');
        if(data_input.email){
            if(!validate.isEmail(data_input.email)){
                console.log('email is not valid');
                return false;
            }
        }
    //cek hp
    if(data_input.mobile){
        if(!validate.isMobilePhone(data_input.mobile,'id-ID')){
            console.log("Your mobile number is not valid!");
            return false;
        }
    }
    // console.log( data_input); //
    contactData.push(data_input);
    fs.writeFileSync(filePath,JSON.stringify(contactData));
    console.log(" >> Data Saved to file");
}
//fungsi list
const listContact = () => {
    const contact = loadContact();
    console.log('Contact List');
    contact.forEach((contact,i) => {
        console.log(`${i+1}.${contact.name} - ${contact.email} - ${contact.mobile}`);
    });
};

// fungsi detail kontak
const detailContact = (name) => {
    const contact = loadContact();
    const findContact = contact.findIndex((contacts) => contacts.name === name);
    if(findContact == -1){
        console.log("data not found");
        return false;
    }
    console.log(`Name    : ${contact[findContact].name}`);
    console.log(`Email   : ${contact[findContact].email}`);
    console.log(`Phone   : ${contact[findContact].mobile}`);

}

//fungi delete
const deleteContact = (name) => {
    const contact = loadContact();
    const index = contact.findIndex((contacts) => contacts.name.toLowerCase() === name.toLowerCase());
    if(index == -1){
        console.log("data not found");
        return false;
    }
    contact.splice(index,1);
    fs.writeFileSync('./data/contacts.json',JSON.stringify(contact));
    console.log("succes to be deleted");
}

module.exports = {saveContact, listContact, detailContact, deleteContact};