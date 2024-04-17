const express = require('express');
const router = express.Router();
const Teacher = require('../backend/schemas/TeacherSchema');
const bcrypt = require('bcryptjs');
const StudentIATSchema = require('./schemas/StudentIATSchema');
const MarksSchema = require('./schemas/MarksSchema');
const StudentsSchema = require('./schemas/StudentsSchema');
// const { Db } = require('mongodb');
const TeacherSubjectsSchema = require('./schemas_revamp/TeacherSubjectSchema');
const SubjectsSchema = require('./schemas_revamp/SubjectsSchema');
const { mongo } = require('mongoose');


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

router.post('/updateemail', async (req, res) => {
    console.log(req.body)
    let filter = { email: req.body.email }
    let update = { email: req.body.new_email }
    try {
        // console.log(filter)
        // console.log(update)
        console.log(req.body)
        if (filter.email === update.email) {
            res.status(201).send("Same email")
        }
        else {
            let Teacher1 = await Teacher.findOneAndUpdate(filter, update);
            if (Teacher1) {
                res.status(200).send('ok')
                console.log(Teacher1)
                // alert("Email updated")
            }
        }
    }
    catch (err) {
        res.status(500).send("internal server error")
        console.log(err)
    }
})

router.post('/updatenumber', async (req, res) => {
    console.log(req.body)
    let filter = { phoneNo: req.body.phoneNo }
    let update = { phoneNo: req.body.new_phoneNo }
    try {
        // console.log(filter)
        // console.log(update)
        console.log(req.body)
        if (filter.phoneNo === update.phoneNo) {
            res.status(201).send("Same number!")
        }
        else {
            let Teacher1 = await Teacher.findOneAndUpdate(filter, update);
            if (Teacher1) {
                res.status(200).send('ok')
                console.log(Teacher1)
                // alert("Email updated")
            }
        }
    }
    catch (err) {
        res.status(500).send("internal server error")
        console.log(err)
    }
})

router.post('/updatename', async (req, res) => {
    console.log(req.body)
    let filter = { username: req.body.username }
    let update = { username: req.body.new_username }
    try {
        // console.log(filter)
        // console.log(update)
        console.log(req.body)
        if (filter.username === update.username) {
            res.status(201).send("Same password")
        }
        else {
            let Teacher1 = await Teacher.findOneAndUpdate(filter, update);
            if (Teacher1) {
                res.status(200).send('ok')
                console.log(Teacher1)
                // alert("Email updated")
            }
        }
    }
    catch (err) {
        res.status(500).send("internal server error")
        console.log(err)
    }
})


router.post('/changepassword', async (req, res) => {
    console.log(req.body)
    let filter = { password: req.body.password }
    let update = { password: req.body.new_password }
    try {
        // console.log(filter)
        // console.log(update)
        console.log(req.body)
        if (filter.password === update.password) {
            res.status(201).send("Same Password")
        }
        else {
            let Teacher1 = await Teacher.findOneAndUpdate(filter, update);
            if (Teacher1) {
                res.status(200).send('ok')
                console.log(Teacher1)
                // alert("Email updated")
            }
            else {
                res.status(202).send('incorrect password')
            }
        }
    }
    catch (err) {
        res.status(500).send("internal server error")
        console.log(err)
    }
})

// router.get('/getemail', async (req, res) => {
//     try {
//         let Teacher1 = await Teacher.findOne({ username: req.body.username })
//         res.send(Teacher1.email).status(200)
//     }
//     catch (err) {
//         res.status(500).send("internal server error")
//     }
// })

router.post('/entermarks', async (req, res) => {
    try {
        console.log(req.body)
        const newMarks = new MarksSchema({
            marks_type: req.body.marks_type,
            sheet: req.body.sheet,
            teacher_name: req.body.teacher_name,
            subject: mongo.ObjectId(req.body.subject),
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
router.get('/getstudents', async (req, res) => {
    try {
        const Students = await StudentsSchema.find({})
        console.log(Students)
        res.status(200).send(Students)
    } catch (err) {
        res.status(500).send(err)
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

router.post('/uploadexcel', async (req, res) => {
    try {
        console.log(req.body)
        const newMarks = new MarksSchema({
            marks_type: req.body.marks_type,
            sheet: req.body.sheet,
            teacher_name: req.body.teacher_name,
            subject: req.body.subject,
            semester: req.body.semester,
            department: req.body.department,
            year: req.body.year,
        })
        try {
            let doc = await MarksSchema.findOne({
                marks_type: req.body.marks_type,
                // sheet: req.body.sheet,
                teacher_name: req.body.teacher_name,
                subject: req.body.subject,
                semester: req.body.semester,
                department: req.body.department,
                year: req.body.year
            })
            console.log(doc)
            if (doc) {
                res.status(200).send(doc)
            }
            else {
                const saved = await newMarks.save()
                res.send(newMarks).status(200)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error.keyValue)
            console.log("Error occured")
        }

    } catch (err) {
        console.log(err)
        res.status(500).send("internal server error")
    }
})

router.post('/fetchexcel', async (req, res) => {
    try {
        let teacher = req.body.teacher_name
        let data = await MarksSchema.find({ teacher_name: teacher }, { sheet: 0 }).populate('subject')
        console.log(data)
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.keyValue)
    }
})


router.post('/excelbyid', async (req, res) => {
    try {
        console.log(req.body._id)
        const sheet = await MarksSchema.findOne({ _id: Object(req.body._id) })
        console.log(sheet)
        res.status(200).send(sheet)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.keyValue)
    }
})
router.post('/updateteachersubject', async (req, res) => {
    try {
        const { subject_id, teacher_id, practical, oral, term, class: class_name } = req.body;

        let teacherSubject = await TeacherSubjectsSchema.findOne({ subject_id, teacher_id, class: class_name });

        if (!teacherSubject) {
            teacherSubject = new TeacherSubjectsSchema({ subject_id, teacher_id, practical, oral, term, class: class_name });
        } else {
            teacherSubject.subject_id = subject_id;
            teacherSubject.teacher_id = teacher_id;
            teacherSubject.practical = practical;
            teacherSubject.oral = oral;
            teacherSubject.term = term;
            teacherSubject.class = class_name;
        }

        await teacherSubject.save();

        res.json({ success: true, message: 'Teacher subject list updated successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post('/updateexcel', async (req, res) => {
    try {
        console.log(req.body._id)
        await MarksSchema.findByIdAndUpdate(req.body._id, { sheet: req.body.sheet })
        res.status(200).send("Ok")
    } catch (err) {
        console.log(err)
        res.status(500).send(error.keyValue)
    }
})
router.post('/teachersubjects', async (req, res) => { //i assume this is done
    try {

        const teachersubjects = await TeacherSubjectsSchema.find(
            { teacher_id: req.body.teacher_id }
        ).populate('subject_id');
        const subject_list = teachersubjects.map(doc => {
            const { __v, teacher_id, _id, subject_id, ...filteredVariables } = doc.toObject(); // Convert Mongoose document to plain JavaScript object
            return { ...filteredVariables, ...subject_id };
        });
        // console.log(filteredVariables)

        res.json({ subject_list })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.keyValue)
    }
})

router.get('/subjectlist', async (req, res) => {
    try {
        const subject_list = await SubjectsSchema.find({})
        // console.log(subject_list)
        res.send(subject_list)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.keyValue)
    }
})
router.post('/addsubject', async (req, res) => {
    try {
        let subject;

        const existingSubject = await SubjectsSchema.findOne({ subject_id: req.body.subject_id });

        if (existingSubject) {
            existingSubject.subject_name = req.body.subject_name;
            existingSubject.branch = req.body.branch;
            subject = await existingSubject.save();
        } else {
            subject = new SubjectsSchema(req.body);
            await subject.save();
        }
        res.send('updated')

    } catch (err) {
        console.log(err)
        res.status(400).send(err.keyValue)
    }
})
module.exports = router;    
