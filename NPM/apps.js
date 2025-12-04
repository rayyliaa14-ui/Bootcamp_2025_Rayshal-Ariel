//Deklarasi variable 
const fs = require('fs');

const Readline = require('readline/promises');
const { main } = require('./contact.js');


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


    main();
