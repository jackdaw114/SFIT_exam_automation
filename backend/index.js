const express = require('express');
const app = express();
const ConnectDB = require("./connect");
const mongoose = require('mongoose');

ConnectDB();
const StudentSchema = require("./schemas/StudentSchema")
const student = mongoose.model('Student');
const post = async () => {
    await student.create({
        name : 'Nigel'
    })
}

post();

app.listen(8000,()=>{
    console.log('server is running on port 8000');
})