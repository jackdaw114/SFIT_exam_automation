const express = require('express');
const router = express.Router();
const Teacher = require('../backend/schemas/TeacherSchema');
const bcrypt = require('bcryptjs');
const StudentIATSchema = require('./schemas/StudentIATSchema');



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

router.post('/entermarks', async (req, res) => {
    try {
        console.log(req.body)
        const newMarks = new StudentIATSchema({
            Name: req.body.name,
            Q1: req.body.q1,
            Q2: req.body.q2,
            Q3: req.body.q3,
            Total: req.body.total,
        })
        try {
            const saved = await newMarks.save()
            res.send(saved).status(200)
        } catch (error) {
            res.status(400).send(error.keyValue)
        }

    } catch (err) {
        res.status(500).send("internal server error")
    }
})
router.get('/getmarks', async (req, res) => {
    try {
        const Marks = await StudentIATSchema.find({})
        console.log(Marks)
        res.send(Marks).status(200)

    } catch (err) {
        res.status(500).send("internal server error")
    }
})
router.post('/updatemarks', async (req, res) => {
    try {
        const Marks = await StudentIATSchema.find({ name: req.body.marks })
        console.log(Marks)

        res.send(Marks).status(200)

    } catch (err) {
        res.status(500).send("internal server error")
    }
})
router.post('/test', async (req, res) => {
    try {
        console.log(req.body)

        res.send('woohooo').status(200)

    } catch (err) {
        res.status(500).send("internal server error")
    }
})

module.exports = router;    
