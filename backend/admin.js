const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema')
const Teacher = require('./schemas/TeacherSchema')


router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        let Admin1 = await Admin.findOne({ username: req.body.username });
        console.log(req.body.password);
        if (Admin1) {
            if (req.body.password === Admin1.password) {
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

router.post('/addteacher', async (req, res) => {
    try {
        await Teacher.create({
            username: req.body.username,
            password: req.body.password,
            subject: req.body.subject,
        }).then(() => {
            res.status(200).send('Ok')
        })
    }catch (err) {
        res.status(500).send(err);
        console.log("Duplicate found!");
    }
})

router.post('/deleteteacher', async (req, res) => {
    try {
        const teacher = await Teacher.deleteOne({
            username:req.body.username
        })
        console.log(teacher)
        if (teacher.deleteCount>0)
            res.status(200).send('OK')
        else
            res.status(201).send('Record not found')
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
})

router.post('/updateteacher', async (req, res) => {
    let filter = { username: req.body.username }
    let update = { subject: req.body.subject}
    try {
        let teacher = await Teacher.findOneAndUpdate(filter, update)
        console.log(teacher)
        if(teacher)
            res.status(200).send('ok')
        else
            res.status(201).send('Record not found')
    } catch (error) {
        res.status(500).send(err);
        console.log(err);
    }
})

module.exports = router;   