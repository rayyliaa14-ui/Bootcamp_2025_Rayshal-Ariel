// const yargs = require('yargs');
// const { hideBin } = require('yargs/helpers');

// const argv = yargs(hideBin(process.argv)).argv;

// console.log("Hello", argv);
const fs = require('fs');
const dataContact = require('./saveOpt.js');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { saveContact } = require('./saveOpt.js');
const { type } = require('os');

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
                demandOption: true,
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
    .command({
        command:'list',
        describe:'contact list',
        handler(){
            dataContact.listContact();
        }
    })
    .command({
        command: 'detail',
        describe: 'detail contact by name',
        builder: {
            name:{
                describe:'Contact name',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv){
            dataContact.detailContact(argv.name);
        }
    })
    .command({
        command:'delete',
        describe:'Delete Contact',
        builder:{
            name:{
                describe:'Delete contact',
                demandOption:true,
                type:'string',
            }
        },
        handler(argv){
            dataContact.deleteContact(argv.name);
        }
    })
    .demandCommand()
    .parse();