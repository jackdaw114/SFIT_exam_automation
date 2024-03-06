const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema')
const Teacher = require('./schemas/TeacherSchema');
const MarksSchema = require('./schemas_revamp/MarksSchema');
const StudentSchema = require('./schemas/StudentsSchema')
const SubjectListSchema = require('./schemas_revamp/SubjectListSchema')
const ExcelJS = require('exceljs');
const xlsx = require('xlsx');

router.post('/creategazette', async (req, res) => {
    try {
        // let data = await MarksSchema.find({ department: req.body.department, semester: req.body.semester, year: req.body.year })

        let filteredMarks = await MarksSchema.find({})
            .populate('subject') // Populate the author field   
        const subject_list = await SubjectListSchema.find({ subject_list: req.data.subject_list })

        let data = filteredMarks.filter(subj =>
            subj.subject.branch === req.body.department &&
            // subj.subject.semester === req.body.semester &&
            subj.year === req.body.year
        )
        console.log(data)
        let workbook_object = {}

        let c = 0;
        await data.forEach(async (x) => {

            temp_worksheet = await xlsx.read(x.sheet, { type: 'binary' })
            workbook_object[c] = {
                sheet: temp_worksheet.Sheets[temp_worksheet.SheetNames[0]],
                marks_type: x.marks_type,
                subject: x.subject.subject_name
            }
            c++;
        })
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
        let student_data = {};
        let subj_list = []; //use subject list to set subjects in json data !!! NOT IMPLEMENTED YET





        let iterator = Object.keys(workbook_object);
        // console.log(iterator)
        await iterator.forEach(e => {
            let element = workbook_object[e]
            // console.log(element.marks_type)
            let i = 2
            while (true) {
                if (element.sheet[`A${i}`] == undefined) {
                    break;
                }
                else {
                    console.log(element.sheet[`C${i}`].v)
                    StudentDictionary(element.sheet[`A${i}`].v, element.sheet[`C${i}`].v, element.subject, element.marks_type, subj_list, student_data)
                    i = i + 1;
                }
            }
        });

        console.log(student_data)
        //temp_sheet['A70'] = { t: 's', v: 'elo' }

        //CREATION OF GAZETTE
        let pids = Object.keys(student_data)

        const entry_dist = 5;
        let entry = 14;
        const column_lista = ['C', 'D', 'E', 'F']
        const column_listb = ['C', 'D', 'E', 'F', 'G']
        //console.log(pids)

        pids.forEach((pid) => {
            // console.log('hello')
            temp_sheet[`A${entry}`] = { t: 's', v: pid };
            column_lista.forEach((item, index) => {
                //console.log('item', item, 'iter:', index)
                temp_sheet[`${item}${entry}`] = { t: 's', v: student_data[pid][`sub${index + 1}`]['theory'] }
                temp_sheet[`${item}${entry + 1}`] = { t: 's', v: `${student_data[pid][`sub${index + 1}`]['term-work']}/${student_data[pid][`sub${index + 1}`]['oral']}` }

            })
            column_listb.forEach((item, index) => {
                //console.log('item', item, 'iter:', index)
                temp_sheet[`${item}${entry + 2}`] = { t: 's', v: student_data[pid][`sub${index + 5}`]['theory'] }
                temp_sheet[`${item}${entry + 3}`] = { t: 's', v: `${student_data[pid][`sub${index + 5}`]['term-work']}/${student_data[pid][`sub${index + 5}`]['oral']}` }

            })
            // TODO: fix this by implementing a subject l

            entry += entry_dist
        })
        //console.log(temp_sheet)
        const newbook = xlsx.utils.book_new();
        temp_sheet['!ref'] = 'A1:J500'

        xlsx.utils.book_append_sheet(newbook, temp_sheet, 'test1')

        xlsx.writeFile(newbook, 'temp2.xlsx')

        res.send({ book: newbook })

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
            'sub1': { 'term-work': '', 'oral': '', 'theory': '' }, //IMPLEMENT SUBJECT LIST HERE
            'sub2': { 'term-work': '', 'oral': '', 'theory': '' },
            'sub3': { 'term-work': '', 'oral': '', 'theory': '' },
            'sub4': { 'term-work': '', 'oral': '', 'theory': '' },
            'sub5': { 'term-work': '', 'oral': '', 'theory': '' },
            'sub6': { 'term-work': '', 'oral': '', 'theory': '' },
            'sub7': { 'term-work': '', 'oral': '', 'theory': '' },
            'sub8': { 'term-work': '', 'oral': '', 'theory': '' },
            'sub9': { 'term-work': '', 'oral': '', 'theory': '' },
        }
        json[pid]['sub1'][type] = marks;

    }

}

router.post('/create_student_marks', async (req, res) => {
    try {
        const students = await StudentSchema.find({ subjects: { $in: [req.body.subject] }, semester: req.body.semester })
        console.log(students)
        if (students !== undefined) {
            const marksPromises = students.map(async (student) => {
                const newMarks = new Marks({
                    student_id: student.pid,
                    subject: req.body.subject,
                    marks_type: req.body.marks_type,
                    year: 2024 //TODO: could be an identification issue here for year (should be more specific ??? idk)
                });
                await newMarks.save();
            });
            await Promise.all(marksPromises);
            console.log(`Marks created for students with subject ${req.body.subject}`);
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
        const MarksList = await MarksSchema.find({ subject: req.body.subject, marks_type: req.body.marks_type, year: 2024 }) //TODO: figure year stuff out as well 
        const StudentList = await Promise.all(MarksList.map(async (marks) => {
            const student = await StudentSchema.findOne({ pid: marks.student_id });
            return { pid: student.pid, name: student.name, marks: marks.marks };
        }));
        res.send(StudentList);
    } catch (error) {
        res.status(500).send(error);
        console.error('Error fetching data:', error);
    }
});




module.exports = router;   