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
const { default: mongoose } = require('mongoose');


// router.post('/login', async (req, res) => {
//     try {
//         console.log(req.body)
//         let Teacher1 = await Teacher.findOne({ username: req.body.username });
//         console.log(req.body.password);
//         if (Teacher1) {
//             if (req.body.password === Teacher1.password) {
//                 res.status(200).send(Teacher1)
//             }
//             else {
//                 res.status(400).send("Incorrect Password!")
//             }
//         }
//         else {
//             res.status(400).send("Teacher does not exist in database!");
//         }
//     }
//     catch (err) {
//         res.status(500).send(err);
//         console.log("Error occured!");
//     }
// })

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
        let sub_obj = new mongoose.Types.ObjectId(subject_id);
        if (!teacherSubject) {
            teacherSubject = new TeacherSubjectsSchema({ subject_id: sub_obj, teacher_id, practical, oral, term, class: class_name });
        } else {
            teacherSubject.subject_id = sub_obj;
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
        console.log(req.body)

        const teachersubjects = await TeacherSubjectsSchema.find(
            { teacher_id: req.body.teacher_id, verified: 1 }
        ).populate('subject_id');
        console.log(teachersubjects)
        const subject_list = teachersubjects.map(doc => {
            const { __v, teacher_id, _id, subject_id, ...filteredVariables } = doc.toObject(); // Convert Mongoose document to plain JavaScript object
            console.log(filteredVariables)
            return { ...filteredVariables, ...subject_id };
        });

        res.json({ subject_list })
    } catch (err) {
        console.log(err + "HELLLOOO")
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
            let test = await StudentsSchema.findOneAndUpdate({ pid: data.pid }, {
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
        // console.log(req.body)
        const students = await StudentsSchema.find({
            subject_ids: { $in: [req.body.subject] },
            semester: req.body.semester,

            class: req.body.class
        })
        console.log(req.body.class)
        console.log(req.body.subject_id)
        const check_teacher = await TeacherSubjectsSchema.findOne({ teacher_id: req.body.teacher_id, subject_id: req.body.subject_id, class: req.body.class })
        let flag = false;

        console.log(check_teacher)
        if (!check_teacher.created[req.body.marks_type]) {
            flag = true;
            const test = await TeacherSubjectsSchema.findOneAndUpdate({ teacher_id: req.body.teacher_id, subject_id: req.body.subject_id, class: req.body.class }, {
                $set: {
                    [`created.${req.body.marks_type}`]: true
                }
            }, { new: true },)
            console.log(test)
        }

        // console.log(students)
        if (students !== undefined && flag === true) {

            const marksPromises = students.map(async (student) => {

                const marksType = req.body.marks_type;
                const subject = req.body.subject;
                const updateObj = {};
                updateObj[marksType] = { ...student[marksType] }
                updateObj[marksType][subject] = -8;
                // updateObj.created[marksType] = true;
                console.log(updateObj)
                StudentsSchema.findOneAndUpdate(
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
            res.send(marksPromises)
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
        console.log("This is my req body=", req.body)
        const students = await StudentsSchema.find({
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

router.post('/get_student', async (req, res) => {
    try {
        const student = await StudentsSchema.findOne({ pid: req.body.pid })
        let sendData;
        if (student) {
            // Extract subject IDs from the student document
            const subjectIds = student.subject_ids;

            // Use Promise.all() to fetch all subjects in parallel
            const subjectPromises = subjectIds.map(subjectId => {
                return SubjectsSchema.findOne({ subject_id: subjectId });
            });

            // Wait for all subjects to be fetched
            const subjects = await Promise.all(subjectPromises);

            // Filter out any null values (in case a subject with a given ID is not found)
            const filteredSubjects = subjects.filter(subject => subject !== null);
            console.log(filteredSubjects)
            // Now, filteredSubjects contains all the found subjects
            sendData = filteredSubjects;
        } else {
            // Handle case where student is not found

        }
        res.json({ student: student, subjects: sendData })
    } catch (err) {
        // Handle errors
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/get_exams', async (req, res) => {
    try {
        // Find teacher subjects based on the teacher_id from the request body
        const teacherSubjects = await TeacherSubjectsSchema.find({ teacher_id: req.body.teacher_id })

        // Initialize an empty array to store the result
        let DisplayList = []

        // Loop through each teacher subject
        for (let item of teacherSubjects) {
            // Populate the 'subject_id' field for each teacher subject
            const populatedItem = await TeacherSubjectsSchema.findById(item._id).populate('subject_id')
            filteredItem = {
                subject_id: populatedItem.subject_id.subject_id,
                semester: populatedItem.subject_id.subject_id.charAt(3),
                class: populatedItem.class,
                subject_name: populatedItem.subject_id.subject_name,
                branch: populatedItem.subject_id.branch
            }

            // console.log(filteredItem)
            // Check if practical exam is created for this subject
            if (populatedItem.created.practical == true) {
                // If practical exam is created, add it to the display list
                DisplayList.push({ ...filteredItem, marks_type: 'practical' })
            }

            if (populatedItem.created.oral == true) {
                // If practical exam is created, add it to the display list
                DisplayList.push({ ...filteredItem, marks_type: 'oral' })
            }
            if (populatedItem.created.term == true) {
                // If practical exam is created, add it to the display list
                DisplayList.push({ ...filteredItem, marks_type: 'term' })
            }
        }

        // Send the display list as the response
        // console.log(DisplayList)
        res.json(DisplayList)


    } catch (err) {
        // Handle errors
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/get_aggregate', async (req, res) => {
    try {
        console.log(req.body.data_list, "this is the datalist")
        console.log(req.body.data_list[0].subject)

        const dataList = req.body.data_list; // Extracting the "data_list" array from the request body


        let data = [];
        let labels = [];
        for (const item of dataList) {
            console.log(item);
            const students = await StudentsSchema.aggregate([
                {
                    $match: {
                        subject_ids: { $in: [item.subject] },
                        class: item.class
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: `$${item.marks_type}.${item.subject}` },
                        count: { $sum: 1 },
                    }
                },
            ]);
            if (students.length > 0) {
                const max_marks = {
                    'term': 50,
                    'practical': 20,
                    'oral': 5
                }
                const avg = (students[0].total / students[0].count) / max_marks[item.marks_type] * 100

                data.push(avg)
                labels.push(item.subject + ' ' + item.marks_type)
                console.log(`Total for subject: ${item.subject}, class: ${item.class} is: ${students[0].total} in ${students[0].total_entries} entries`);
                console.log(JSON.stringify(students[0], null, 2))
                console.log(data)
            } else {
                console.log(`No students found for subject: ${item.subject}, class: ${item.class}`);
            }
        }
        res.json({ data: data, labels: labels })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;    
