//Deklarasi variable 
const fs = require('fs');
// const Readline = require('readline/promises');
const mainContacts = require('./contact.js');

const main = async() => {
    const name = await mainContacts.question("What is your name? ");
    const phone = await mainContacts.question("What is your phone number? ");
    const email = await mainContacts.question("What is your email? ");

    mainContacts.saveContact(name,phone,email);
}

main();


    // const name = await question('What is your name? ');
    //     const phone = await question('What is your phone number? ');
    //     const email = await question('What is your email? ');
    