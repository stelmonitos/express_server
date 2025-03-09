const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');


// tworze middleware (metode do res: res.show)
// kod jest dzieki temu bardziej czytelny
// app.use((req, res, next) => {
//     res.show = (name) => {
//         res.sendFile(path.join(__dirname, `/views/${name}`));
//     };
//     next();
// });
// ^nie potrzebne poniewaz przechodze na res.render od handlebars ktore domyslnie uzywa views jako katalogu do layoutow wiec jest gotowym middlewarem

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.show('index.html');
});

app.get('/about', (req, res) => {
    res.show('about.html');
});

app.get('/contact', (req, res) => {
    res.show('contact.html');
});

app.get('/info', (req, res) => {
    res.show('info.html');
});

app.get('/history', (req, res) => {
    res.show('history.html');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { layout: false, name: req.params.name });
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});