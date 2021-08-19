const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variables');
const users = require('./db/users');

const app = express();
const pathStatic = path.join(__dirname, 'static');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(pathStatic));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', pathStatic);






app.get('/', (req, res) => {
    res.render('firstPage');
})

app.get('/registration', (req, res) => {
    console.log(req.body);
    res.render('registration');
})

app.post('/login', (req, res) => {

    users.push(req.body);
    console.log(req.body);
    res.render('login');
})

app.post('/users', (req, res) => {
    res.end('ok')
    //res.render('users')
})

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
