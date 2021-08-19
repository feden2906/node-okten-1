const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variables');
const users = require('./db/users.js');

const pathStatic = path.join(__dirname, 'static');

const app = express();

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
    res.render('registration');
})

app.post('/login', (req, res) => {

    users.forEach(user => {
        if (user.email === req.body.email) {
            users.push(req.body); // не працює
            console.log(req.body);
            res.render('login');
        }
    })
})

app.post('/user', (req, res) => {

    users.forEach(user => {
        if(user.email === req.body.email && user.password === req.body.password) {
         // const user = user;
            res.render('userPage', {user, isUserPresent: true});
        }
    })
})

app.get('/users', (req, res) => {
    res.render('users', {users})
})

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
