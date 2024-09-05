const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema')
const Teacher = require('./schemas/TeacherSchema');
const xlsx = require('xlsx');
const TeacherSubjectSchema = require('./schemas_revamp/TeacherSubjectSchema');
const StudentsSchema = require('./schemas/StudentsSchema');
const SubjectsSchema = require('./schemas_revamp/SubjectsSchema');
const SubjectListSchema = require('./schemas_revamp/SubjectListSchema');
const ReportSchema = require('./schemas/ReportSchema');



// router.post('/login', async (req, res) => {
//     try {
//         console.log(req.body)
//         let Admin1 = await Admin.findOne({ username: req.body.username });
//         console.log(req.body.password);
//         if (Admin1) {
//             if (req.body.password === Admin1.password) {
//                 res.status(200).send(Admin1)
//             }
//             else {
//                 res.status(400).send("Incorrect Password!")
//             }
//         }
//         else {
//             res.status(400).send("Admin does not exist in database!");
//         }
//     }
//     catch (err) {
//         res.status(500).send(err);
//         console.log("Error occured!");
//     }
// })

const generateRandomPassword = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/addteacher', async (req, res) => {
    try {
        await Teacher.create({
            username: req.body.username,
            password: req.body.password,
        }).then(() => {
            res.status(200).send('Ok')
        })
    } catch (err) {
        res.status(201).send("Teacher already exists with same username!");
    }
})

router.post('/deleteteacher', async (req, res) => {
    try {
        const teacher = await Teacher.deleteOne({
            username: req.body.username
        })
        // console.log("Hello: ", teacher)
        if (teacher.deletedCount > 0) {
            res.status(200).send('OK')
        }
        else
            res.status(201).send('Record not found')
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
})
router.post('/update_subject_list', async (req, res) => {
    try {
        console.log(req.body)
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
router.post('/set_subject_list', async (req, res) => {
    try {
        let subjectList = await SubjectListSchema.findOne({ semester: req.body.semester, branch: req.body.branch });
        if (subjectList) {
            const filter = { semester: req.body.semester, branch: req.body.branch };
            const update = { $set: { subject_list: subjectList.subject_list } };
            StudentsSchema.updateMany(filter, update)
            res.send('updated');
        }
        else {
            res.status(400).send('failed to find subject llist')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.keyValue)

    }
})

router.post('/create_gazette', async (req, res) => {
    try {


        let students = await StudentsSchema.find({ semester: req.body.semester, branch: req.body.branch },

        )
        let SubjectList = await SubjectListSchema.findOne({ semester: req.body.semester, branch: req.body.branch }, {
            subject_ids: true
        }) // TODO: this might not be useful but go figure

        SubList = SubjectList.subject_ids

        console.log(SubList)
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
        const entry_dist = 7;

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
                console.log('item', item, 'iter:', index)

                if (index < SubList.length && student.practical && student.term && student.oral && student.iat && student.ese) {
                    console.log(index, "hello here")

                    if (student.ese.hasOwnProperty(SubList[index]) && student.iat.hasOwnProperty(SubList[index])) {
                        const ese = student.ese[SubList[index]] ?? 'no data';
                        const iat = student.iat[SubList[index]] ?? 'no data';
                        const total = ese !== 'no data' && iat !== 'no data' ? `${ese}         ${iat}              ${parseInt(ese, 10) + parseInt(iat, 10)}` : 'no data';

                        temp_sheet[`${item}${entry}`] = { t: 's', v: total };
                    }

                    if (student.term.hasOwnProperty(SubList[index]) && student.oral.hasOwnProperty(SubList[index]) && student.practical.hasOwnProperty(SubList[index])) {
                        temp_sheet[`${item}${entry + 1}`] = {
                            t: 's', v: student.oral && student.term && student.oral[SubList[index]] && student.term[SubList[index]] && student.practical && student.practical[SubList[index]] ? `${student.term[SubList[index]]}/${student.oral[SubList[index]] >= 0 && student.practical[SubList[index]] >= 0 ? student.oral[SubList[index]] + student.practical[SubList[index]] : -8}` : 'no data'
                        }
                    }
                }
            })

            column_listb.forEach((item, index) => {
                //console.log('item', item, 'iter:', index)
                if (index + 5 < SubList.length && student.practical && student.term && student.oral && student.iat && student.ese) {

                    if (student.ese.hasOwnProperty(SubList[index + 5]) && student.iat.hasOwnProperty(SubList[index + 5])) {
                        const ese = student.ese[SubList[index + 5]] ?? 'no data';
                        const iat = student.iat[SubList[index + 5]] ?? 'no data';
                        const total = ese !== 'no data' && iat !== 'no data' ? `${ese}         ${iat}              ${parseInt(ese, 10) + parseInt(iat, 10)}` : 'no data';

                        temp_sheet[`${item}${entry + 3}`] = { t: 's', v: total };
                    }


                    if (student.term.hasOwnProperty(SubList[index + 5]) && student.oral.hasOwnProperty(SubList[index + 5]) && student.practical.hasOwnProperty(SubList[index + 5])) {
                        temp_sheet[`${item}${entry + 4} `] = {
                            t: 's', v: student.oral && student.term && student.practical && student.oral[SubList[index + 5]] && student.term[SubList[index + 5]] ? `${student.term[SubList[index + 5]]}/${student.oral[SubList[index + 5]] >= 0 && student.practical[SubList[index + 5]] >= 0 ? student.oral[SubList[index] + 5] + student.practical[SubList[index + 5]] : -8}` : 'no data'
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


router.post('/updateteacher', async (req, res) => {
    let filter = { username: req.body.username }
    let update = { subject: req.body.subject }
    try {
        let teacher = await Teacher.findOneAndUpdate(filter, update)
        console.log(teacher)
        if (teacher)
            res.status(200).send('ok')
        else
            res.status(201).send('Record not found')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})




function StudentDictionary(pid, marks, subject, type, subj_list, json) {
    let keys = Object.keys(json)
    if (keys.includes(pid)) {
        json[pid][subject][type] = marks;
    }
    else {
        json[pid] = {
            'sub1': { 'term': '', 'oral': '', 'theory': '' }, //IMPLEMENT SUBJECT LIST HERE
            'sub2': { 'term': '', 'oral': '', 'theory': '' },
            'sub3': { 'term': '', 'oral': '', 'theory': '' },
        }

        json[pid][subject][type] = marks;
    }
}
router.post('/save_report', async (req, res) => {
    try {
        console.log(req.body);
        for (let i = req.body.start; i <= req.body.end; i++) {
            if (!req.body.exceptions.includes(i)) {
                let tempStudent = await StudentsSchema.findOne({ pid: i })
                if (tempStudent) {
                    console.log(tempStudent.term)
                    const historic_report = await ReportSchema.updateOne({ pid: i, branch: req.body.branch, semester: req.body.semester }, {
                        term: { ...tempStudent.term },
                        oral: tempStudent.oral,
                        practical: tempStudent.practical,
                        subject_ids: tempStudent.subject_ids,

                    }, {
                        upsert: true,
                        new: true,
                    })

                    console.log(historic_report)
                    if (req.body.clear) {

                        const updateObject = {
                            term: {},
                            practical: {},
                            oral: {}
                        };
                        if (req.body.updatedSemester) {
                            updateObject.semester = req.body.updatedSemester;
                        }
                        const tempSaved = await StudentsSchema.updateOne({ pid: i }, {
                            $set: {
                                ...updateObject
                            }
                        })
                        console.log(tempSaved + "line 3")
                    }
                }

            }
        }
        res.status(200).send("updated")
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
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
            console.log("Student not found!")

        }
        res.json({ student: student, subjects: sendData })
    } catch (err) {
        // Handle errors
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})
router.post('/add_subject', async (req, res) => {
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
router.post('/get_unverified_teacher_subject', async (req, res) => {
    try {
        const teachers = await TeacherSubjectSchema.aggregate([{
            $match:
                { verified: 0 }
        },

        {
            $lookup: {
                from: "subjects",
                localField: "subject_id",
                foreignField: "_id",
                as: "subjectDetails"
            }
        },
        {
            $group: {
                _id: "$teacher_id",
                details: {
                    $push: {
                        subject_details: "$subjectDetails",
                        class: "$class",
                        time: "$time",
                        _id: "$_id",
                    }
                },

            }
        },])
        console.log(teachers)
        res.send(teachers)
    } catch (error) {
        console.log(error)
        res.status(500).send('error')
    }
})
router.post('/get_accepted_teacher_subject', async (req, res) => {
    try {
        const teachers = await TeacherSubjectSchema.aggregate([{
            $match:
                { verified: 1 }
        },

        {
            $lookup: {
                from: "subjects",
                localField: "subject_id",
                foreignField: "_id",
                as: "subjectDetails"
            }
        },
        {
            $group: {
                _id: "$teacher_id",
                details: {
                    $push: {
                        subject_details: "$subjectDetails",
                        class: "$class",
                        time: "$time",
                        _id: "$_id",
                    }
                },

            }
        },])
        console.log(teachers)
        res.send(teachers)
    } catch (error) {
        console.log(error)
        res.status(500).send('error')
    }
})

router.post('/get_rejected_teacher_subject', async (req, res) => {
    try {
        const teachers = await TeacherSubjectSchema.aggregate([{
            $match:
                { verified: 2 }
        },

        {
            $lookup: {
                from: "subjects",
                localField: "subject_id",
                foreignField: "_id",
                as: "subjectDetails"
            }
        },
        {
            $group: {
                _id: "$teacher_id",
                details: {
                    $push: {
                        subject_details: "$subjectDetails",
                        class: "$class",
                        time: "$time",
                        _id: "$_id",
                    }
                },

            }
        },])
        console.log(teachers)
        res.send(teachers)
    } catch (error) {
        console.log(error)
        res.status(500).send('error')
    }
})

router.post('/accept_teacher_subject', async (req, res) => {
    try {
        const updated_obj = await TeacherSubjectSchema.findOneAndUpdate({ _id: req.body._id },
            { $set: { verified: 1 } },
            { new: true })
        res.send(updated_obj)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }
})
router.post('/deny_teacher_subject', async (req, res) => {
    try {
        const updated_obj = await TeacherSubjectSchema.findOneAndUpdate({ _id: req.body._id },
            { $set: { verified: 2 } },
            { new: true })
        res.send(updated_obj)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }
})


module.exports = router;   