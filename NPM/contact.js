const fs = require('fs');
const readline = require('readline');

//Apakah Folder dan File sudah ada?
const dPath = './data';
if(!fs.existsSync(dPath)){
    fs.mkdirSync(dPath);
}

//cek apakah sudah ada file?
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
} 

//Dekalari rl sebagai I/O
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

// make a function to ask
const question = (ask) =>{
    return new Promise((resolve,reject)=>{
        rl.question(ask,(inputVariable)=>{
            resolve(inputVariable);
        })
    })
}

//Proses input data
const saveContact = (name,phone,email) => {
    const contact = {name,phone,email};
    const file = fs.readFileSync('./data/contact.json','utf8');
    console.log(file);
    const contacts = JSON.parse(file);
    console.log(contacts);
    contacts.push(contact);
    fs.writeFileSync('./data/contact.json',JSON.stringify(contacts));
        console.log("Thanks for input the data!");
        rl.close();
    }

    module.exports = { saveContact, question };