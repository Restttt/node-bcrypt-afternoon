require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const app = express();

// .env variables
const { SERVER_PORT, SESSION_SECRET, SERVER_ADDRESS } = process.env;

//controllers and middleware imports
const authCtrl = require('./controllers/authController.js');
const trCtrl = require('./controllers/treasureController.js');

const auth = require('./middleware/authMiddleware');


// middleware
massive(SERVER_ADDRESS).then(db => {
    app.set('db', db);
    console.log('db is set');
});
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// authController request
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

// treasure Controller request

app.get('/api/treasure/dragon', trCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, trCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, trCtrl.addMyTreasure);
app.get('/api/treasure/all', auth.adminsOnly, trCtrl.getAllTreasure);

app.listen(SERVER_PORT, () => console.log(`listening at ${SERVER_PORT}`));