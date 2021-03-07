const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const homeRouter = require('./routes/homeRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const tokenRouter = require('./routes/tokenRouter');
const signupRouter = require('./routes/signupRouter');
const cityRouter = require('./routes/cityRouter');

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/token', tokenRouter);
app.use('/signup', signupRouter);
app.use('/city', cityRouter);

// Rute koje je postoje
app.get('*', (req, res) => {
    res.status(404).json({ error: true, message: 'Ova ruta ne posotji!' });
});
app.post('*', (req, res) => {
    res.status(404).json({ error: true, message: 'Ova ruta ne posotji!' });
});
app.put('*', (req, res) => {
    res.status(404).json({ error: true, message: 'Ova ruta ne posotji!' });
});
app.patch('*', (req, res) => {
    res.status(404).json({ error: true, message: 'Ova ruta ne posotji!' });
});
app.delete('*', (req, res) => {
    res.status(404).json({ error: true, message: 'Ova ruta ne posotji!' });
});

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
    if (!err) {
        console.log(`App started on port ${port}`);
    } else {
        console.log(err);
    }
});

module.exports = app;