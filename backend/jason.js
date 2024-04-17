const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema')
const Teacher = require('./schemas/TeacherSchema');
const StudentSchema = require('./schemas/StudentsSchema')
const SubjectListSchema = require('./schemas_revamp/SubjectListSchema')
const ExcelJS = require('exceljs');
const xlsx = require('xlsx');

const TeacherSubjectsSchema = require('./schemas_revamp/TeacherSubjectSchema');
const TeacherSchema = require('./schemas/TeacherSchema');
const SubjectsSchema = require('./schemas_revamp/SubjectsSchema');
const { default: mongoose } = require('mongoose');



router.post('/update_data', async (req, res) => {
    try {
        console.log(req.body);
        const updatedData = req.body.updated_data;
        const marksType = req.body.marks_type;
        const subjectId = req.body.subject_id;

        // Iterate through updated data and update marks for each student
        for (const data of updatedData) {
            console.log({ student_pid: data.pid, marks_type: marksType, subject_code: subjectId });
            // Update document using the Mongoose model
            let test = await StudentSchema.findOneAndUpdate({ pid: data.pid }, {
                $set:
                {
                    [`${marksType}.${subjectId}`]: Number(data.marks)
                }
            });
            console.log(test)
        }

        res.status(200).send("Marks updated successfully");
    } catch (error) {
        // Handle errors and send appropriate response to the client
        console.error('Error updating marks:', error);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/create_student_marks', async (req, res) => {
    try {
        console.log(req.body)
        const students = await StudentSchema.find({
            subject_ids: { $in: [req.body.subject] },
            semester: req.body.semester,

            class: req.body.class
        })

        const check_teacher = await TeacherSubjectsSchema.findOne({ teacher_id: req.body.teacher_id })
        let flag = true;
        console.log(check_teacher.created[req.body.marks_type])
        if (!check_teacher.created[req.body.marks_type]) {
            flag = true;
            await TeacherSubjectsSchema.findOneAndUpdate({ teacher_id: req.body.teacher_id }, {
                $set: {
                    [`created.${req.body.marks_type}`]: true
                }
            })
        }

        console.log(students)
        if (students !== undefined && flag === true) {

            const marksPromises = students.map(async (student) => {

                const marksType = req.body.marks_type;
                const subject = req.body.subject;
                const updateObj = {};
                updateObj[marksType] = { ...student[marksType] }
                updateObj[marksType][subject] = -8;
                console.log(updateObj)
                StudentSchema.findOneAndUpdate(
                    { _id: student._id },
                    { ...updateObj },
                    { new: true },
                ).then(error => {
                    // console.log(error)
                });

                console.log('saved')
            });
            await Promise.all(marksPromises);
            console.log(`Marks created for students with subject ${req.body.subject}`);
            res.send('done')
        }
        else if (!flag) {
            res.send('done')
        }
        else {
            res.send('no students')
        }
    } catch (error) {
        res.send(error)
        console.error('Error creating marks:', error);
        throw error;
    }
})

router.post('/getdata', async (req, res) => {
    try {
        console.log(req.body)
        const students = await StudentSchema.find({
            subject_ids: { $in: [req.body.subject_id] },
            semester: req.body.semester,
            class: req.body.class_name
        }
            ,
            {
                pid: true,
                name: true,
                [req.body.marks_type]: true
            })

        console.log(students)

        const sendData = await students.map((student) => {
            const { [req.body.marks_type]: marksTypeValue, ...remainingData } = student.toObject();
            return { ...remainingData, marks: marksTypeValue[req.body.subject_id] }
        })
        console.log(students)
        res.send(sendData); //TODO: add filer before sending so that only marks type and subject gets sent alonn gwith name
    } catch (error) {
        res.status(500).send(error);
        console.error('Error fetching data:', error);
    }
});

router.post('/get_exam', async (req, res) => {
    try {
        let teacherSubject = await TeacherSubjectsSchema.find({ teacher_id: req.body.teacher_id }).populate('subject_id')
        for (const sub of teacherSubject) {

        }

        res.send(teacherSubject)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.keyValue)
    }
})


module.exports = router;   