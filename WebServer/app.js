const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgan = require('morgan');

const pool = require('./config/db_connect');

const app = express();
const port = 3000;

// View engine
app.set('view engine', 'ejs');
app.use(expressLayout);

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Import routes
const indexRoute = require('./routes/index');
const contactRoute = require('./routes/contact');
const aboutRoute = require('./routes/about');

// Use routes
app.use('/', indexRoute);
app.use('/contact', contactRoute);
app.use('/about', aboutRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});