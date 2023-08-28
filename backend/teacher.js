const express = require('express');
const router = express.Router();
const Teacher = require('../backend/schemas/TeacherSchema');
const bcrypt = require('bcryptjs');
const StudentIATSchema = require('./schemas/StudentIATSchema');
const MarksSchema = require('./schemas/MarksSchema');



router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        let Teacher1 = await Teacher.findOne({ username: req.body.username });
        console.log(req.body.password);
        if (Teacher1) {
            if (req.body.password === Teacher1.password) {
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

router.post('/entermarks', async (req, res) => {
    try {
        console.log(req.body)
        const newMarks = new MarksSchema({
            marks_type: req.body.marks_type,
            sheet: req.body.sheet,
            teacher_name: req.body.teacher_name
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


        const { _id, ...filteredObject } = req.body;
        console.log(filteredObject)
        StudentIATSchema.findByIdAndUpdate(req.body._id, { ...filteredObject }, function (err, result) {

            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }

        })


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
