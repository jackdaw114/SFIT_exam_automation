const express = require('express');
const router = express.Router();
const Admin = require('./schemas/AdminSchema')
const Teacher = require('./schemas/TeacherSchema');
const MarksSchema = require('./schemas_revamp/MarksSchema');
const ExcelJS = require('exceljs');
const xlsx = require('xlsx');


router.post('/marksdata', async (req, res) => {
    try {
        workbook = await xlsx.read(req.body.sheet, { type: 'binary' })
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let iter = 0
        while (true) {
            if (worksheet[`A${iter}`].v) {
                if (typeof worksheet[`A${iter}`].v === 'number' & typeof worksheet[`C${iter}`].v === 'number') {
                    MarksSchema.findOneAndUpdate(
                        {
                            student_id: worksheet[`A${iter}`].v,
                        }, // Query criteria
                        {
                            marks: worksheet[`C${iter}`].v,
                            subject_code: req.body.subject, //TODO: figure out changes here
                            marks_type: req.body.marks_type
                        }, // Update object
                        { upsert: true, new: true } // Options: upsert creates a new document if no match is found, new returns the updated document
                    )
                        .then(updatedUser => {
                            console.log('Updated user:', updatedUser);
                        })
                        .catch(error => {
                            console.error('Error updating user:', error);
                        });
                }
            }
            else
                break
            iter = iter + 1;
        }


    } catch (err) {
        console.log(err)
        res.status(500).send(error.keyValue)
    }
})

module.exports = router;    
