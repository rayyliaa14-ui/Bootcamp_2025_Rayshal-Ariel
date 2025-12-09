const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile('./index.html',{root: __dirname})
    //   res.send('Hello World!');
})
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html',{root: __dirname});
})
app.get('/about', (req, res) => {
  res.sendFile('./about.html', {root: __dirname});
})

app.use('/',(req,res) =>{
    res.status(404);
    res.send('page not found');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

