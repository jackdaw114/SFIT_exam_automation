const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema');
const Teacher = require('./schemas/TeacherSchema');
const xlsx = require('xlsx');
const TeacherSubjectSchema = require('./schemas_revamp/TeacherSubjectSchema');
const StudentsSchema = require('./schemas/StudentsSchema');
const SubjectsSchema = require('./schemas_revamp/SubjectsSchema');
const SubjectListSchema = require('./schemas_revamp/SubjectListSchema');
const ReportSchema = require('./schemas/ReportSchema');

// Helper function to generate a random 6-digit password
const generateRandomPassword = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route to add a new teacher
router.post('/addteacher', async (req, res) => {
    try {
        // Create a new teacher in the database
        await Teacher.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(200).send('Ok');
    } catch (err) {
        // Handle case where teacher already exists
        res.status(201).send("Teacher already exists with same username!");
    }
});

// Route to delete a teacher
router.post('/deleteteacher', async (req, res) => {
    try {
        // Attempt to delete the teacher from the database
        const teacher = await Teacher.deleteOne({ username: req.body.username });
        if (teacher.deletedCount > 0) {
            res.status(200).send('OK');
        } else {
            res.status(201).send('Record not found');
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

// Route to update the subject list for a semester and branch
router.post('/update_subject_list', async (req, res) => {
    try {
        // Check if subject list exists and update, or create new
        let existingSubjectList = await SubjectListSchema.findOne({
            semester: req.body.semester,
            branch: req.body.branch
        });
        if (existingSubjectList) {
            existingSubjectList.subject_ids = req.body.subject_ids;
            await existingSubjectList.save();
        } else {
            let SubjectList = new SubjectListSchema(req.body);
            await SubjectList.save();
        }
        res.send('updated');
    } catch (err) {
        console.log(err);
        res.status(400).send(err.keyValue);
    }
});

// Route to set the subject list for students of a specific semester and branch
router.post('/set_subject_list', async (req, res) => {
    try {
        let subjectList = await SubjectListSchema.findOne({
            semester: req.body.semester,
            branch: req.body.branch
        });
        if (subjectList) {
            const filter = { semester: req.body.semester, branch: req.body.branch };
            const update = { $set: { subject_list: subjectList.subject_list } };
            await StudentsSchema.updateMany(filter, update);
            res.send('updated');
        } else {
            res.status(400).send('failed to find subject list');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.keyValue);
    }
});

// Route to create a gazette (Excel file) with student marks
router.post('/create_gazette', async (req, res) => {
    try {
        // Fetch students and subject list
        let students = await StudentsSchema.find({
            semester: req.body.semester,
            branch: req.body.branch
        });
        let SubjectList = await SubjectListSchema.findOne({
            semester: req.body.semester,
            branch: req.body.branch
        }, { subject_ids: true });

        SubList = SubjectList.subject_ids;

        // Read Excel template
        const template = xlsx.readFile('./ExcelTemplates/gazette_temp.xlsx');
        const temp_sheet = template.Sheets[template.SheetNames[0]];

        // Set column widths
        temp_sheet['!cols'] = [
            { wch: 7 }, { wch: 35 }, { wch: 30 }, { wch: 30 },
            { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 7 },
            { wch: 7 }, { wch: 7 }
        ];

        // Sort students by PID
        let sortedStudents = students.sort((a, b) => a.pid < b.pid ? -1 : 1);

        // Populate Excel sheet with student data
        let entry = 14;
        const entry_dist = 7;
        const column_lista = ['C', 'D', 'E', 'F'];
        const column_listb = ['C', 'D', 'E', 'F', 'G'];

        sortedStudents.forEach((student) => {
            temp_sheet[`A${entry}`] = { t: 's', v: student.pid };

            // Populate marks for first set of subjects
            column_lista.forEach((item, index) => {
                if (index < SubList.length && student.practical && student.term &&
                    student.oral && student.iat && student.ese) {
                    // Populate ESE and IAT marks
                    if (student.ese.hasOwnProperty(SubList[index]) &&
                        student.iat.hasOwnProperty(SubList[index])) {
                        const ese = student.ese[SubList[index]] ?? 'no data';
                        const iat = student.iat[SubList[index]] ?? 'no data';
                        const total = ese !== 'no data' && iat !== 'no data' ?
                            `${ese}         ${iat}              ${parseInt(ese, 10) + parseInt(iat, 10)}` :
                            'no data';
                        temp_sheet[`${item}${entry}`] = { t: 's', v: total };
                    }

                    // Populate Term, Oral, and Practical marks
                    if (student.term.hasOwnProperty(SubList[index]) &&
                        student.oral.hasOwnProperty(SubList[index]) &&
                        student.practical.hasOwnProperty(SubList[index])) {
                        temp_sheet[`${item}${entry + 1}`] = {
                            t: 's',
                            v: student.oral && student.term && student.oral[SubList[index]] &&
                                student.term[SubList[index]] && student.practical &&
                                student.practical[SubList[index]] ?
                                `${student.term[SubList[index]]}/${student.oral[SubList[index]] >= 0 &&
                                    student.practical[SubList[index]] >= 0 ?
                                    student.oral[SubList[index]] + student.practical[SubList[index]] : -8}` :
                                'no data'
                        };
                    }
                }
            });

            // Populate marks for second set of subjects
            column_listb.forEach((item, index) => {
                if (index + 5 < SubList.length && student.practical && student.term &&
                    student.oral && student.iat && student.ese) {
                    // Populate ESE and IAT marks
                    if (student.ese.hasOwnProperty(SubList[index + 5]) &&
                        student.iat.hasOwnProperty(SubList[index + 5])) {
                        const ese = student.ese[SubList[index + 5]] ?? 'no data';
                        const iat = student.iat[SubList[index + 5]] ?? 'no data';
                        const total = ese !== 'no data' && iat !== 'no data' ?
                            `${ese}         ${iat}              ${parseInt(ese, 10) + parseInt(iat, 10)}` :
                            'no data';
                        temp_sheet[`${item}${entry + 3}`] = { t: 's', v: total };
                    }

                    // Populate Term, Oral, and Practical marks
                    if (student.term.hasOwnProperty(SubList[index + 5]) &&
                        student.oral.hasOwnProperty(SubList[index + 5]) &&
                        student.practical.hasOwnProperty(SubList[index + 5])) {
                        temp_sheet[`${item}${entry + 4}`] = {
                            t: 's',
                            v: student.oral && student.term && student.practical &&
                                student.oral[SubList[index + 5]] && student.term[SubList[index + 5]] ?
                                `${student.term[SubList[index + 5]]}/${student.oral[SubList[index + 5]] >= 0 &&
                                    student.practical[SubList[index + 5]] >= 0 ?
                                    student.oral[SubList[index + 5]] + student.practical[SubList[index + 5]] : -8}` :
                                'no data'
                        };
                    }
                }
            });

            entry += entry_dist;
        });

        // Create new workbook and write to file
        const newbook = xlsx.utils.book_new();
        temp_sheet['!ref'] = 'A1:J500';
        xlsx.utils.book_append_sheet(newbook, temp_sheet, 'test1');
        xlsx.writeFile(newbook, 'temp2.xlsx');

        res.send({ book: newbook });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Route to update teacher information
router.post('/updateteacher', async (req, res) => {
    let filter = { username: req.body.username };
    let update = { subject: req.body.subject };
    try {
        let teacher = await Teacher.findOneAndUpdate(filter, update);
        if (teacher)
            res.status(200).send('ok');
        else
            res.status(201).send('Record not found');
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

// Helper function to manage student dictionary
function StudentDictionary(pid, marks, subject, type, subj_list, json) {
    let keys = Object.keys(json);
    if (keys.includes(pid)) {
        json[pid][subject][type] = marks;
    } else {
        json[pid] = {
            'sub1': { 'term': '', 'oral': '', 'theory': '' },
            'sub2': { 'term': '', 'oral': '', 'theory': '' },
            'sub3': { 'term': '', 'oral': '', 'theory': '' },
        };
        json[pid][subject][type] = marks;
    }
}

// Route to save student reports
router.post('/save_report', async (req, res) => {
    try {
        for (let i = req.body.start; i <= req.body.end; i++) {
            if (!req.body.exceptions.includes(i)) {
                let tempStudent = await StudentsSchema.findOne({ pid: i });
                if (tempStudent) {
                    // Update or create historic report
                    await ReportSchema.updateOne(
                        { pid: i, branch: req.body.branch, semester: req.body.semester },
                        {
                            term: { ...tempStudent.term },
                            oral: tempStudent.oral,
                            practical: tempStudent.practical,
                            subject_ids: tempStudent.subject_ids,
                        },
                        { upsert: true, new: true }
                    );

                    // Clear student data if required
                    if (req.body.clear) {
                        const updateObject = {
                            term: {},
                            practical: {},
                            oral: {}
                        };
                        if (req.body.updatedSemester) {
                            updateObject.semester = req.body.updatedSemester;
                        }
                        await StudentsSchema.updateOne({ pid: i }, {
                            $set: { ...updateObject }
                        });
                    }
                }
            }
        }
        res.status(200).send("updated");
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to get student information
router.post('/get_student', async (req, res) => {
    try {
        const student = await StudentsSchema.findOne({ pid: req.body.pid });
        let sendData;
        if (student) {
            // Fetch all subjects for the student
            const subjectPromises = student.subject_ids.map(subjectId =>
                SubjectsSchema.findOne({ subject_id: subjectId })
            );
            const subjects = await Promise.all(subjectPromises);
            sendData = subjects.filter(subject => subject !== null);
        }
        res.json({ student: student, subjects: sendData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add or update a subject
router.post('/add_subject', async (req, res) => {
    try {
        const existingSubject = await SubjectsSchema.findOne({ subject_id: req.body.subject_id });
        if (existingSubject) {
            existingSubject.subject_name = req.body.subject_name;
            existingSubject.branch = req.body.branch;
            await existingSubject.save();
        } else {
            const subject = new SubjectsSchema(req.body);
            await subject.save();
        }
        res.send('updated');
    } catch (err) {
        console.log(err);
        res.status(400).send(err.keyValue);
    }
});

// Route to get unverified teacher-subject associations
router.post('/get_unverified_teacher_subject', async (req, res) => {
    try {
        const teachers = await TeacherSubjectSchema.aggregate([
            { $match: { verified: 0 } },
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
            },
        ]);
        res.send(teachers);
    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
});

// Route to get accepted teacher-subject associations
router.post('/get_accepted_teacher_subject', async (req, res) => {
    try {
        const teachers = await TeacherSubjectSchema.aggregate([
            { $match: { verified: 1 } },
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
            },
        ]);
        res.send(teachers);
    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
});

// Route to get rejected teacher-subject associations
router.post('/get_rejected_teacher_subject', async (req, res) => {
    try {
        const teachers = await TeacherSubjectSchema.aggregate([
            { $match: { verified: 2 } },
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
            },
        ]);
        res.send(teachers);
    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
});

// Route to accept a teacher-subject association
router.post('/accept_teacher_subject', async (req, res) => {
    try {
        const updated_obj = await TeacherSubjectSchema.findOneAndUpdate(
            { _id: req.body._id },
            { $set: { verified: 1 } },
            { new: true }
        );
        res.send(updated_obj);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Route to deny a teacher-subject association
router.post('/deny_teacher_subject', async (req, res) => {
    try {
        const updated_obj = await TeacherSubjectSchema.findOneAndUpdate(
            { _id: req.body._id },
            { $set: { verified: 2 } },
            { new: true }
        );
        res.send(updated_obj);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;