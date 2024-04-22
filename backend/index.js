const express = require('express');
const app = express();
const cors = require('cors')
const ConnectDB = require("./connect");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
const StudentSchema = require("./schemas/StudentIATSchema")
const AdminSchema = require('./schemas/AdminSchema');
const TeacherSchema = require('./schemas/TeacherSchema');
const admin = mongoose.model('Admin');



app.use('/teacher', require('./teacher.js'))
app.use('/admin', require('./admin.js'))
app.use('/jason', require('./jason.js'))
app.use('/revamp', require('./dbmsrevamp'))

// const post = async () => {
//     try {

//         await admin.create({
//             username: 'Richa',
//             password: 'richa123',
//         })
//     }
//     catch (err) {
//         console.log('Duplicate found!');
//     }
// }

//post();

app.listen(8000, () => {
    console.log('server is running on port 8000');
})