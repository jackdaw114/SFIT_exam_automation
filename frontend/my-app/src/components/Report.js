import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import img from '../imgtest/favicon.png';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';
import axiosInstance from './axiosInstance';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    mainContent: {
        flexGrow: 1,
        border: '1pt solid #000',
    },
    sectionTop: {
        borderBottom: '1pt solid #000',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e3f2fd', // Light blue background
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', // Subtle shadow
    },
    sectionMid: {
        borderBottom: '1pt solid #000',
        padding: 15,
        backgroundColor: '#f5f5f5', // Light grey background
    },
    sectionBot: {
        padding: 10,
    },
    image: {
        width: 60,
        height: 'auto',
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottom: '1pt solid #000',
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '0.5pt solid #000',
        padding: 5,
    },
    tableCell: {
        flex: 1,
        fontSize: 8,
        padding: 2,
    },
    tableCellWide: {
        flex: 2,
        fontSize: 8,
        padding: 2,
    },
    bold: {
        fontFamily: 'Helvetica-Bold',
    },
    centerText: {
        textAlign: 'center',
    },
});


const MyDocument = ({ data }) => {
    const subjlist = data?.student?.subject_ids;
    const expand_exam = [
        "FIRST YEAR ENGINEERING SEMESTER 1",
        "FIRST YEAR ENGINEERING SEMESTER 2",
        "SECOND YEAR ENGINEERING SEMESTER 3",
        "SECOND YEAR ENGINEERING SEMESTER 4",
        "THIRD YEAR ENGINEERING SEMESTER 5",
        "THIRD YEAR ENGINEERING SEMESTER 6",
        "FOURTH YEAR ENGINEERING SEMESTER 7",
        "FOURTH YEAR ENGINEERING SEMESTER 8",
    ];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.mainContent}>
                    <View style={styles.sectionTop}>
                        <Image src={img} style={styles.image} />
                        <Text style={[styles.bold, { fontSize: 15 }]}>ST. FRANCIS INSTITUTE OF TECHNOLOGY</Text>
                        <Text style={{ fontSize: 12 }}>(ENGINEERING COLLEGE)</Text>
                        <Text style={{ fontSize: 9 }}>Mount Poinsur, Borivli (West), Mumbai - 400103</Text>
                        <Text style={{ fontSize: 9 }}>(Affiliated to University of Mumbai)</Text>
                    </View>

                    {/* Margin Left no work bruh */}
                    <View style={styles.sectionMid}>
                        <Text style={[styles.bold, { fontSize: 15, textAlign: 'center', marginBottom: 15 }]}>Grade Card</Text>
                        <Text style={{ fontSize: 12, marginBottom: 5 }}>NAME: <Text style={{ marginLeft: 10 }}>{data?.student?.name.toUpperCase()}</Text></Text>
                        <Text style={{ fontSize: 12, marginBottom: 5 }}>EXAMINATION: <Text style={{ marginLeft: 10 }}>{expand_exam[data?.student?.semester - 1]}</Text></Text>
                        <Text style={{ fontSize: 12, marginBottom: 5 }}>HELD IN: <Text style={{ marginLeft: 10 }}>2024</Text></Text>
                        <Text style={{ fontSize: 12, marginBottom: 5 }}>BRANCH: <Text style={{ marginLeft: 10 }}>{data?.student?.branch.toUpperCase()}</Text></Text>
                        <Text style={{ fontSize: 12, marginBottom: 5 }}>PID: <Text style={{ marginLeft: 10 }}>{data?.student?.pid}</Text></Text>
                    </View>



                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCell, styles.bold, styles.centerText]}>COURSE CODE</Text>
                        <Text style={[styles.tableCellWide, styles.bold, styles.centerText]}>COURSE TITLE</Text>
                        {/* <Text style={[styles.tableCell, styles.bold]}>COURSE CREDIT</Text> */}
                        <Text style={[styles.tableCell, styles.bold, styles.centerText]}>TERM</Text>
                        <Text style={[styles.tableCell, styles.bold, styles.centerText]}>TERM</Text>
                        <Text style={[styles.tableCell, styles.bold, styles.centerText]}>TERM</Text>
                        <Text style={[styles.tableCell, styles.bold, styles.centerText]}>PR/OR</Text>
                        <Text style={[styles.tableCell, styles.bold, styles.centerText]}>OVERALL</Text>
                        {/* <Text style={[styles.tableCell, styles.bold]}>CREDIT EARNED</Text>
                        <Text style={[styles.tableCell, styles.bold]}>CREDIT POINTS</Text>
                        <Text style={[styles.tableCell, styles.bold]}>C X G</Text> */}
                    </View>

                    {subjlist?.map((item, index) => {
                        const subject = data?.subjects?.find(subject => subject.subject_id === item);
                        return (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.tableCell}>{item}</Text>
                                <Text style={styles.tableCellWide}>{subject?.subject_name}</Text>
                                {/* <Text style={[styles.tableCell, styles.centerText]}>Course Credit</Text> */}
                                <Text style={[styles.tableCell, styles.centerText]}>{data?.student?.term[item] || 'N/A'}</Text>
                                <Text style={[styles.tableCell, styles.centerText]}>{data?.student?.term[item] || 'N/A'}</Text>
                                <Text style={[styles.tableCell, styles.centerText]}>{data?.student?.term[item] || 'N/A'}</Text>
                                <Text style={[styles.tableCell, styles.centerText]}>
                                    {(data?.student?.practical[item] || 0) + (data?.student?.oral[item] || 0) || 'N/A'}
                                </Text>
                                <Text style={[styles.tableCell, styles.centerText]}>
                                    {(data?.student?.practical[item] || 0) + (data?.student?.oral[item] || 0) + (data?.student?.term[item] || 0) || 'N/A'}
                                </Text>
                                {/* <Text style={[styles.tableCell, styles.centerText]}>Credit Earned</Text> */}
                                {/* <Text style={[styles.tableCell, styles.centerText]}>Credit Points</Text> */}
                                {/* <Text style={[styles.tableCell, styles.centerText]}>C X G</Text> */}
                            </View>
                        );
                    })}

                    <View style={styles.sectionBot}>
                        <Text style={[styles.bold, { fontSize: 9, marginTop: 10 }]}>Remark:</Text>
                        <Text style={[styles.bold, { fontSize: 9, marginTop: 5 }]}>CGPI:</Text>
                        <Text style={[styles.bold, { fontSize: 9, marginTop: 5 }]}>SGPI:</Text>
                        <Text style={[styles.bold, { fontSize: 9, marginTop: 10 }]}>Result Date:</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={[styles.bold, { fontSize: 9 }]}>CHECKED BY</Text>
                            <Text style={[styles.bold, { fontSize: 9 }]}>PRINCIPAL</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default function Report() {
    const [student, setStudent] = useState();
    const [open, setOpen] = useState(true);
    const [pid, setPid] = useState('');

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSend = () => {
        setOpen(false);
        axiosInstance.post('/admin/get_student', { pid: parseInt(pid) })
            .then(res => {
                setStudent(res.data);
                setPid('');
            })
            .catch(error => console.error('Error fetching student data:', error));
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setPid(value);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Student PID</DialogTitle>
                <DialogContent>
                    <Input
                        value={pid}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter PID (6 digits)"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSend} disabled={!pid}>Submit</Button>
                </DialogActions>
            </Dialog>

            <PDFViewer style={{
                position: 'fixed', width: '80vw', height: '88vh', bottom: 0, right: 0, zIndex: 9999
            }}>
                <MyDocument data={student} />
            </PDFViewer>

            <Button
                style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 99999 }}
                color='primary'
                variant='contained'
                onClick={handleClickOpen}
            >
                Select Student
            </Button>
        </>
    );
}