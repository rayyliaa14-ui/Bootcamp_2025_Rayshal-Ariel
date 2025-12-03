// const fs = require('fs');
// const { stdin, stdout } = require('process');
//  console.log(fs);

//  create file with synchronous 

// fs.writeFileSync("test.txt","Hello World by synchronous!!");

// fs.readFile('test.txt','utf-8', (err,data) => {
//     if(err) throw err;
//     console.log(data);
// })

const readline = require('readline');
    const rls = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rls.question("What is your name? ", (name) =>{
        console.log(`Hi, ${name}!`);
        rls.close();
    });