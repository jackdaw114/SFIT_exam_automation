const express = require('express');
const router = express.Router();
const Admin = require('../backend/schemas/AdminSchema');
const bcrypt = require('bcryptjs');



router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        let admin = await Admin.findOne({ username: req.body.username });
        console.log(admin);
        if (admin) {
            if (req.body.password === admin.password) {
                res.status(200).send("Login Successful!")
            }
            else {
                res.status(400).send("Incorrect Password!")
            }
        }
        else {
            res.status(400).send("Admin does not exist in database!");
        }
    }
    catch (err) {
        res.status(500).send("Error Occured!");
        console.log("Error occured!");
    }
})

module.exports = router;    
