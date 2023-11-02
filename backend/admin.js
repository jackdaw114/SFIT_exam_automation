const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema')
const Teacher = require('./schemas/TeacherSchema');
const MarksSchema = require('./schemas/MarksSchema');
const ExcelJS = require('exceljs');
const xlsx = require('xlsx');

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
        let workbook_object = {}
        const workbook = await xlsx.read(data[0].sheet, { type: 'binary' })
        const wbdetails = data[0].subject;
        let c = 0;
        await data.forEach(async (x) => {
            //workbook_object.c = ''
            //console.log('iterating')
            temp_worksheet = await xlsx.read(x.sheet, { type: 'binary' })
            workbook_object[c] = {
                sheet: temp_worksheet.Sheets[temp_worksheet.SheetNames[0]],
                marks_type: x.marks_type,
                subject: x.subject
            }
            //console.log(workbook_object)
            c++;
        })
        console.log(workbook_object)
        //const workbook2 = await xlsx.read(data[1].sheet, { type: 'binary' })
        const template = xlsx.readFile('./ExcelTemplates/gazette_temp.xlsx')
        const temp_sheet = template.Sheets[template.SheetNames[0]]
        // temp_sheet["C45"] = {
        //     t: 's',
        //     v: "HI"
        // };



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
        //console.log(temp_sheet)

        // console.log(workbook.Sheets[workbook.SheetNames[0]])
        let Marksheet = workbook.Sheets[workbook.SheetNames[0]]
        let student_data = {};
        let subj_list = []; //use subject list to set subjects in json data !!! NOT IMPLEMENTED YET

        //for ()
        let i = 2
        //console.log(Marksheet1['A90'] == undefined)

        let iterator = Object.keys(workbook_object);
        console.log(iterator)
        iterator.forEach(e => {
            let element = workbook_object[e]
            console.log(element)
            while (true) {
                if (element.sheet[`A${i}`] == undefined) {
                    break;
                }
                else {
                    console.log(element)
                    StudentDictionary(element.sheet[`A${i}`].v, Marksheet[`C${i}`].v, element.subject, element.marks_type, subj_list, student_data)
                    i++
                }
            }
        });
        console.log(student_data)
        //CREATION OF GAZETTE
        let pids = Object.keys(student_data)
        pids.sort()
        const entry_dist = 5;
        let entry = 14;
        pids.forEach((pid) => {
            //console.log('working')
            temp_sheet[`A${entry}`] = { t: 's', v: pid };
            temp_sheet[`C${entry}`] = { t: 's', v: student_data[pid]['sub1']['theory'], r: `<t xml:space="preserve">${student_data[pid]['sub1']['theory']}</t>` }
            temp_sheet[`C${entry + 1}`] = { t: 's', v: `${student_data[pid]['sub1']['term']}/${student_data[pid]['sub1']['oral']}`, r: `<t xml:space="preserve">${student_data[pid]['sub1']['term']}/${student_data[pid]['sub1']['oral']}</t>` }
            temp_sheet[`D${entry}`] = { t: 's', v: student_data[pid]['sub2']['theory'], r: `<t xml:space="preserve">${student_data[pid]['sub2']['theory']}</t>` }
            temp_sheet[`D${entry + 1}`] = { t: 's', v: `${student_data[pid]['sub2']['term']}/${student_data[pid]['sub2']['oral']}`, r: `<t xml:space="preserve">${student_data[pid]['sub2']['term']}/${student_data[pid]['sub2']['oral']}</t>` }
            temp_sheet[`E${entry}`] = { t: 's', v: student_data[pid]['sub3']['theory'], r: `<t xml:space="preserve">${student_data[pid]['sub3']['theory']}</t>` }
            temp_sheet[`E${entry + 1}`] = { t: 's', v: `${student_data[pid]['sub1']['term']}/${student_data[pid]['sub3']['oral']}`, r: `<t xml:space="preserve">${student_data[pid]['sub3']['term']}/${student_data[pid]['sub3']['oral']}</t>` }
            entry += entry_dist
        })

        //StudentDictionary(212098, 23, 'sub1', subj_list, student_data)
        //console.log(temp_sheet)

        xlsx.writeFile(template, 'temp.xlsx')
        xlsx.writeFile(workbook, 'test.xlsx')

        res.send('wee')
        //console.log(workbook.Sheets[workbook.SheetNames[0]])
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

module.exports = router;   