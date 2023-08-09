const express = require('express');
const app = express();
const cors = require('cors')
const ConnectDB = require("./connect");
const mongoose = require('mongoose');

ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const StudentSchema = require("./schemas/StudentSchema")
const AdminSchema = require('./schemas/AdminSchema')
const student = mongoose.model('Student');
const admin = mongoose.model('Admin');
app.use('/',require('./login'))
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

app.listen(8000,()=>{
    console.log('server is running on port 8000');
})