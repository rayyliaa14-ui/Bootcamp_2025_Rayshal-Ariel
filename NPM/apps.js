//Deklarasi variable 
const fs = require('fs');
const readline = require('readline');
const { Readline } = require('readline/promises');

// make a function to ask
const question = (ask) =>{
    return new Promise((resolve,reject)=>{
        rl.question(ask,(inputVariable)=>{
            resolve(inputVariable);
        })
    })
}

//Dekalari rl sebagai I/O
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

//Apakah Folder dan File sudah ada?
const dPath = './data';
if(!fs.existsSync(dPath)){
    fs.mkdirSync(dPath);
}

//cek apakah sudah ada file?
const dataPath = './data/contacs.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');

} 
//Proses input data
const main = async() => {
    const name = await question('What is your name? ');
    const phone = await question('What is your phone number? ');
    const email = await question('What is your email? ');

    const contact = {name,phone,email};
    const file = fs.readFileSync('./data/contacs.json','utf8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('./data/contacs.json',JSON.stringify(contacts));
        console.log("Thanks for input the data!");
        rl.close();
    }

    main()