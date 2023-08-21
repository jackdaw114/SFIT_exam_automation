const express = require('express');
const router = express.Router();
const Teacher = require('../backend/schemas/TeacherSchema');
const bcrypt = require('bcryptjs');



router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        let Teacher = await Teacher.findOne({ username: req.body.username });
        console.log(Teacher);
        if (Teacher) {
            if (req.body.password === Teacher.password) {
                res.status(200).send("Login Successful!")
            }
            else {
                res.status(400).send("Incorrect Password!")
            }
        }
        else {
            res.status(400).send("Teacher does not exist in database!");
        }
    }
    catch (err) {
        res.status(500).send("Error Occured!");
        console.log("Error occured!");
    }
})

module.exports = router;    
