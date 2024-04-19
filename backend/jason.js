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

router.post('/update_subject_list', async (req, res) => {
    try {
        let existingSubjectList = await SubjectListSchema.findOne({ semester: req.body.semester, branch: req.body.branch })
        if (existingSubjectList) {
            existingSubjectList.subject_ids = req.body.subject_ids;
            subjectList = await existingSubjectList.save();
        }
        else {
            SubjectList = new SubjectListSchema(req.body);
            await SubjectList.save();
        }
        res.send('updated')
    } catch (err) {
        console.log(err)
        res.status(400).send(err.keyValue)
    }
})

router.post('/create_gazette', async (req, res) => {
    try {
        let students = await StudentSchema.find({ semester: req.body.semester, branch: req.body.branch },
            // {
            //     pid: true,
            //     name: true,
            //     oral: true,
            //     practical: true,
            //     term: true,
            // }
        )
        let SubjectList = await SubjectListSchema.findOne({ semester: req.body.semester, branch: req.body.branch }, {
            subject_ids: true
        }) // TODO: this might not be useful but go figure

        SubList = SubjectList.subject_ids
        console.log(students)
        console.log(SubjectList)
        console.log("hello")
        const template = xlsx.readFile('./ExcelTemplates/gazette_temp.xlsx')
        const temp_sheet = template.Sheets[template.SheetNames[0]]

        temp_sheet['!cols'] = [
            { wch: 7 },
            { wch: 35 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 7 },
            { wch: 7 },
            { wch: 7 }
        ];
        const entry_dist = 5;

        let entry = 14;
        const column_lista = ['C', 'D', 'E', 'F']
        const column_listb = ['C', 'D', 'E', 'F', 'G']


        let sortedStudents = await students.sort((a, b) => {
            // Compare two elements based on a specific property
            // For example, sorting based on the name property
            if (a.pid < b.pid) {
                return -1; // a should come before b in the sorted order
            } else {
                return 1; // a should come after b in the sorted order
            }
        });

        await sortedStudents.forEach((student) => {
            // console.log('hello')
            temp_sheet[`A${entry}`] = { t: 's', v: student.pid };
            column_lista.forEach((item, index) => {
                //console.log('item', item, 'iter:', index)

                if (index < SubList.length && student.practical && student.term && student.oral) {
                    console.log(index, "hello here")
                    if (student.practical.hasOwnProperty(SubList[index])) {
                        temp_sheet[`${item}${entry}`] = { t: 's', v: (student.practical && student.practical[SubList[index]]) ?? 'no data' }
                    }
                    if (student.term.hasOwnProperty(SubList[index]) && student.oral.hasOwnProperty(SubList[index])) {
                        temp_sheet[`${item}${entry + 1}`] = {
                            t: 's', v: student.oral && student.term && student.oral[SubList[index]] && student.term[SubList[index]] ? `${student.term[SubList[index]]}/${student.oral[SubList[index]]}` : 'no data'
                        }
                    }
                }
            })

            column_listb.forEach((item, index) => {
                //console.log('item', item, 'iter:', index)
                if (index + 5 < SubList.length && student.practical && student.term && student.oral) {
                    if (student.practical.hasOwnProperty(SubList[index + 5])) {

                        temp_sheet[`${item}${entry + 2} `] = { t: 's', v: student.practical && student.practical[SubList[index + 5]] ? student.practical[SubList[index + 5]] : 'no data' }
                    }

                    if (student.term.hasOwnProperty(SubList[index + 5]) && student.oral.hasOwnProperty(SubList[index + 5])) {
                        temp_sheet[`${item}${entry + 3} `] = {
                            t: 's', v: student.oral && student.term && student.oral[SubList[index + 5]] && student.term[SubList[index + 5]] ? `${student.term[SubList[index + 5]]}/${student.orals[SubList[index + 5]]}` : 'no data'
                        }
                    }
                }
            })
            entry += entry_dist
        })
        const newbook = xlsx.utils.book_new();
        temp_sheet['!ref'] = 'A1:J500'

        xlsx.utils.book_append_sheet(newbook, temp_sheet, 'test1')

        xlsx.writeFile(newbook, 'temp2.xlsx')

        res.send({ book: newbook })

    } catch (err) {
        console.log(err)
        res.send(err)


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

            console.log(filteredItem)
            // Check if practical exam is created for this subject
            if (populatedItem.created.practical === true) {
                // If practical exam is created, add it to the display list
                DisplayList.push({ ...filteredItem, marks_type: 'practical' })
            }

            if (populatedItem.created.oral === true) {
                // If practical exam is created, add it to the display list
                DisplayList.push({ ...filteredItem, marks_type: 'oral' })
            }
            if (populatedItem.created.term === true) {
                // If practical exam is created, add it to the display list
                DisplayList.push({ ...filteredItem, marks_type: 'term' })
            }
        }

        // Send the display list as the response
        res.json(DisplayList)

    } catch (err) {
        // Handle errors
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/get_student', async (req, res) => {
    try {
        const student = await StudentSchema.findOne({ pid: req.body.pid })
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
router.post('/get_analytics', async (req, res) => {
    try {
        // 1. Find teacher subjects
        const teacherSubjects = await TeacherSubjectsSchema.find({ teacher_id: req.body.teacher_id })
            .populate('subject_id'); // Populate subject details

        // 2. Extract subject IDs from teacher subjects
        const teacherSubjectIds = teacherSubjects.map((subject) => subject.subject_id.subject_id === req.body.subject_id ? subject.subject_id.subject_id : null);
        console.log(teacherSubjects)
        console.log(teacherSubjectIds)
        // 3. Find students with matching subject subscriptions (using $in operator)
        const students = await StudentSchema.find({
            subject_ids: { $in: teacherSubjectIds },
        });
        console.log(students.length)
        teacherSubjectIds.map((subjectIds) => {
            const studentPracsArray = students.map((student) => student.practical && student.practical[subjectIds] ? student.practical[subjectIds] : 0)
            console.log(studentPracsArray)
        })
        // 4. Send student data as response
        res.json(students);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;   