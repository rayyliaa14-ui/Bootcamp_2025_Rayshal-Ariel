const fs = require('fs');
const readline = require('readline');

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
const main = async() => {
    const name = await question('What is your name? ');
    const phone = await question('What is your phone number? ');
    const email = await question('What is your email? ');

    const contact = {name,phone,email};
    const file = fs.readFileSync('./data/contact.json','utf8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('./data/contact.json',JSON.stringify(contacts));
        console.log("Thanks for input the data!");
        rl.close();
    }

    module.exports = { main };