const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("What is your name? ", (name) => {
rl.question("People call you who? ", (called) =>{
rl.question("Where and when is your born? ", (ttgl) =>{
rl.question("What is your gender? ", (gender) => {
rl.question("What is ur phone number? ", (phone) => {
rl.question("What is your email? ", (email) => {
rl.question("Where do u live? ", (address) =>{
console.log("\n==== your data ====\n");
console.log(`your name is : ${name}
\npeople call you : ${called}
\nyour birth date and place is : ${ttgl}
\nyour gender is :  ${gender}
\nyour phone number is : ${phone}
\nyour email is : ${email}
\nyou live in : ${address}`);
                        })
                    })
                })
            })
        })
    })
})
