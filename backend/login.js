const express = require('express');
const TeacherSchema = require('./schemas/TeacherSchema');
const AdminSchema = require('./schemas/AdminSchema');
const router = express.Router();
const jwt = require('jsonwebtoken')

const teacherSecretKey = process.env.TEACHER_SECRET_KEY
const adminSecretKey = process.env.ADMIN_SECRET_KEY

router.post('/teacher/login', async (req, res) => {
    try {
        console.log(req.body)
        let Teacher1 = await TeacherSchema.findOne({ username: req.body.username });
        console.log(req.body.password);
        if (Teacher1) {
            if (req.body.password === Teacher1.password) {
                const token = jwt.sign({ teacher: Teacher1 }, teacherSecretKey, { expiresIn: '1h' });

                res.cookie('jwtToken', token, { httpOnly: true });
                res.status(200).send(Teacher1)
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
        res.status(500).send(err);
        console.log("Error occured!");
    }
})

router.post('/admin/login', async (req, res) => {
    try {
        console.log(req.body)
        let Admin1 = await AdminSchema.findOne({ username: req.body.username });
        console.log(req.body.password);
        if (Admin1) {
            if (req.body.password === Admin1.password) {
                const token = jwt.sign({ admin: Admin1 }, adminSecretKey, { expiresIn: '1h' });

                res.cookie('jwtToken', token, { httpOnly: true });
                res.status(200).send(Admin1)
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
        res.status(500).send(err);
        console.log("Error occured!");
    }
})

module.exports = router;    
