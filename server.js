// Chunk 1
require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const sendMail = require('./services/mail');
const { log } = console;
const app = express();

const PORT = process.env.PORT;

// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static('public'));


// email, subject, text
app.post('/email', (req, res) => {
    const { subject, name, email, text } = req.body;
    // log('Data: ', req.body);

    sendMail(email, name, subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!' });
    });
});


// Render home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Error page
// app.get('/error', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'error.html'));
// });

// // Email sent page
// app.get('/email/sent', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'emailMessage.html'));
// });


// Start server
app.listen(PORT, () => log('Server is starting on PORT, ', PORT));