const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/data/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

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
    res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', upload.single('uploaded_file'), (req, res) => {
    const file = req.file

    const { author, sender, title, message } = req.body;
  
    if(author && sender && title && message && file) {
      res.render('contact', { isSent: true, file: file.filename });
    }
    else {
        res.render('contact', { isError: true });
    }
  });

app.use((req, res) => {
    res.status(404).render('404', {layout: false});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});