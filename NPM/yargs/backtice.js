const fs = require('fs');

//cek apakah folder ada
const foldPath = './data';
if(!fs.existsSync(foldPath)){
    fs.mkdirSync(foldPath);
}

//cek the file exist
const filePath = './data/.cont.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath,'[]','utf-8');
}   

//function to create 
const createData = (data_input) => {
    const fileData = fs.readFileSync(filePath,'utf-8');
    const contactData = JSON.parse(fileData);
    contactData.push(data_input);
    fs.writeFileSync(filePath,JSON.stringify(contactData));
}

// function to delete the data
const delData = (data) => {
    const fileData = fs.readFileSync(filePath,'utf-8');
    const contactData = JSON.parse(fileData);
    const findData = contactData.findIndex(input => input.name == data);
    contactData.splice(findData,1);
    fs.writeFileSync(filePath,JSON.stringify(contactData));
    console.log(" >> Success to be deleted");
}

module.exports = { createData, delData };

