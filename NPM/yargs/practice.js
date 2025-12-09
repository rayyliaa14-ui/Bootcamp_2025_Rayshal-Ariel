const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const local_lib = require('./backtice.js');

    yargs(hideBin(process.argv))
    .command({
        command: 'add',
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
            phone: {
                describe:'contact number',
                demandOption:'true',
                type:'string',
            },
        },
        handler(argv){
            const contact = {
                name: argv.name,
                email: argv.email,
                phone: argv.phone,
            }
            //save function
            local_lib.createData(contact);
        },
    })
    .command({
        command: 'del',
        describe:'Delete Concatc',
        builder:{
            name:{
                describe:'Contact name',
                demandOption:true,
                type:'string',
            },
        },
        handler(argv){
            const contact = {
                name: argv.name,
            }
            local_lib.delData(contact);
        }
    })    
    .demandCommand()
    .parse();