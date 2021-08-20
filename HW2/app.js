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
    const userExist = users.some(user => user.email === req.body.email);

    if (userExist) {
        res.status(409).end('User with such mail exists');
    }

    users.push(req.body);
    res.render('login');

    // if (!userExist) {
    //     users.push(req.body);
    //     res.render('login');
    // }
});

app.post('/users/:user_id', (req, res) => {
    // const isUserPresent = users.some(user => {
    //     if (user.email === req.body.email && user.password === req.body.password) {
    //         return true
    //     }
    // });

    const user = users.find(user => user.email === req.body.email && user.password === req.body.password);

    if (!user) {
        res.status(404).end('User Not Found');
        return;
    }

    res.render('userPage', {user});
});

app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
