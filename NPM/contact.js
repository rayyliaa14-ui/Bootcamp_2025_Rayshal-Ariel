// make a function to ask

const main = async() => {
    const name = await question('What is your name? ');
    const phone = await question('What is your phone number');

    const contact = {name,mobile};
    const file = fs.readFileSync('.data/contacs.json','utf8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacs.json'.JSON.stringify(contacts));
    console.log('thanks');
    
}