// const yargs = require('yargs');
// const { hideBin } = require('yargs/helpers');

// const argv = yargs(hideBin(process.argv)).argv;

// console.log("Hello", argv);
const fs = require('fs');
const dataContact = require('./saveOpt.js');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { saveContact } = require('./saveOpt.js');

yargs(hideBin(process.argv))
    .command({
        command:'add',
        describe:'add contact',
        builder:{
            name:{
                describe:'Contact Name',
                demandOption: true,
                type: 'string',
            },
            email: {
                describe: 'contact email',
                demandOption: false,
                type:'string',
            },
            mobile:{
                describe:'contact mobile number phone',
                demandOption:true,
                type: 'string',
            },
        },
        handler(argv){
            const contact = {
                name: argv.name,
                email: argv.email,
                mobile: argv.mobile,
            };
            // console.log(contact);
            saveContact(contact);
        },
    })
    .demandCommand()
    .parse();