const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

//information about ejs
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  const contact = [{
    name:'ray',
    email:'ray@gmail.com',
  },{
    name:'sal',
    email:'sal@yahoo.com',
  },{
    name:'ariel',
    email:'ariel@try.com',
  }];
  res.render('index', {name: "rayshal", title: "Webserver EJS",contact});
})
app.get('/contact', (req, res) => {
  res.render('contact');
})
app.get('/about', (req, res) => {
  res.render('about')
  // res.sendFile('./views/about.html', {root: __dirname});
})

app.get('/produk/:id', (req, res) => {
    res.send(` product ID = ${req.params.id} 
      <br> category = ${req.query.category}`);
});

app.use('/',(req,res) =>{
    res.status(404);
    res.send('page not found');
})
app.listen(port, () => {
  console.log(`Example app listening on port [${port}]`)
})





