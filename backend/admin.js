const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema')
const Teacher = require('./schemas/TeacherSchema');
const MarksSchema = require('./schemas/MarksSchema');
const ExcelJS = require('exceljs');
const xlsx = require('xlsx');
const TeacherSubjectSchema = require('./schemas_revamp/TeacherSubjectSchema');

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
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            subject: req.body.subject,
        }).then(() => {
            res.status(200).send('Ok')
        })
    } catch (err) {
        res.status(500).send(err);
        console.log("Duplicate found!");
    }
})

router.post('/deleteteacher', async (req, res) => {
    try {
        const teacher = await Teacher.deleteOne({
            username: req.body.username
        })
        console.log(teacher)
        if (teacher.deleteCount > 0)
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
    let update = { subject: req.body.subject }
    try {
        let teacher = await Teacher.findOneAndUpdate(filter, update)
        console.log(teacher)
        if (teacher)
            res.status(200).send('ok')
        else
            res.status(201).send('Record not found')
    } catch (error) {
        res.status(500).send(err);
        console.log(err);
    }
})

router.post('/creategazette', async (req, res) => {
    try {
        let data = await MarksSchema.find({ department: req.body.department, semester: req.body.semester, year: req.body.year })
        // console.log(data)
        let workbook_object = {}

        let c = 0;
        await data.forEach(async (x) => {

            temp_worksheet = await xlsx.read(x.sheet, { type: 'binary' })
            workbook_object[c] = {
                sheet: temp_worksheet.Sheets[temp_worksheet.SheetNames[0]],
                marks_type: x.marks_type,
                subject: x.subject
            }
            c++;
        })
        // console.log(workbook_object)
        const template = xlsx.readFile('./ExcelTemplates/gazette_temp.xlsx')
        const temp_sheet = template.Sheets[template.SheetNames[0]]
        console.log(template.Sheets[template.SheetNames[3]])



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
        let student_data = {};
        let subj_list = []; //use subject list to set subjects in json data !!! NOT IMPLEMENTED YET


        let i = 2


        let iterator = Object.keys(workbook_object);
        // console.log(iterator)
        iterator.forEach(e => {
            let element = workbook_object[e]
            console.log(element)
            while (true) {
                if (element.sheet[`A${i}`] == undefined) {
                    break;
                }
                else {
                    console.log(element)
                    StudentDictionary(element.sheet[`A${i}`].v, element.sheet[`C${i}`].v, element.subject, element.marks_type, subj_list, student_data)
                    i = i + 1;
                }
            }
        });
        temp_sheet['A70'] = { t: 's', v: 'elo' }

        //CREATION OF GAZETTE
        let pids = Object.keys(student_data)

        const entry_dist = 5;
        let entry = 14;
        pids.forEach((pid) => {

            temp_sheet[`A${entry}`] = { t: 's', v: pid };
            temp_sheet[`C${entry}`] = { t: 's', v: student_data[pid]['sub1']['theory'] }
            temp_sheet[`D${entry}`] = { t: 's', v: student_data[pid]['sub2']['theory'] }
            temp_sheet[`E${entry}`] = { t: 's', v: student_data[pid]['sub3']['theory'] }
            temp_sheet[`C${entry + 1}`] = { t: 's', v: `${student_data[pid]['sub1']['term']}/${student_data[pid]['sub1']['oral']}` }
            temp_sheet[`D${entry + 1}`] = { t: 's', v: `${student_data[pid]['sub2']['term']}/${student_data[pid]['sub2']['oral']}` }
            temp_sheet[`E${entry + 1}`] = { t: 's', v: `${student_data[pid]['sub1']['term']}/${student_data[pid]['sub3']['oral']}` }
            entry += entry_dist
        })
        //console.log(temp_sheet)
        const newbook = xlsx.utils.book_new();
        temp_sheet['!ref'] = 'A1:J500'
        console.log('hello')
        xlsx.utils.book_append_sheet(newbook, temp_sheet, 'test1')

        xlsx.writeFile(newbook, 'temp2.xlsx')

        res.send('wee')

    } catch (err) {
        console.log(err)
        res.status(500).send('error')
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

router.post('/get_unverified_teacher_subject', async (req, res) => {
    try {
        const teachers = await TeacherSubjectSchema.find({ verified: false })
        res.send(teachers)
    } catch (error) {
        console.log(error)
        res.status(500).send('error')
    }
})

router.post('/verify_teacher_subject', async (req, res) => {
    try {
        const updateTeacher = await TeacherSubjectSchema.findOneAndUpdate({ _id: req.body._id }, { $set: { verified: true } })
        res.status(200).send(updateTeacher)
    } catch (error) {

        console.log(error)
        res.status(500).send('error')
    }
})

module.exports = router;   