const express = require('express');
const app = express();
const cors = require('cors')
const ConnectDB = require("./connect");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authTeacher, authAdmin } = require('./authMiddleware.js')

ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors())


app.use('/', require('./login.js'))
app.use('/admin', authAdmin) //authentication
app.use('/teacher', authTeacher) //authentication
app.use('/teacher', require('./teacher.js'))
app.use('/admin', require('./admin.js'))


app.get('/logout', (req, res) => {
    res.clearCookie('jwtToken'); // Clear the cookie named 'authToken'
    res.send('Successfully logged out!');
});


app.listen(8000, () => {
    console.log('server is running on port 8000');
})