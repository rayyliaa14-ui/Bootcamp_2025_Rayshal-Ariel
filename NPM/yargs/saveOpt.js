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

//buat fungsi saveContact untuk simpan kontak ke file JSON
const saveContact = (data_input) =>{
    const fileData = fs.readFileSync(filePath,'utf-8');
    const contactData = JSON.parse(fileData); 
    // console.log('data input is = ' + contactData); -- Debug (hiraukan)
    contactData.push(data_input);
    fs.writeFileSync(filePath,JSON.stringify(contactData));
    console.log(" >> Data Saved to file");
}

module.exports = {saveContact};