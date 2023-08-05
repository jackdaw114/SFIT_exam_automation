const express = require('express');
const app = express();
const ConnectDB = require("./connect")

ConnectDB();

app.listen(8000,()=>{
    console.log('server is running on port 8000');
})