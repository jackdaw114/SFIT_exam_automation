import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import zIndex from '@mui/material/styles/zIndex';
import img from '../imgtest/favicon.png';
import axios from 'axios';

// Font.register({ family: 'Roboto', src: source });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',

    },
    mainContent: {
        flexGrow: 1,
        margin: 10,
        border: '1px solid #000',
    },
    sectionTop: {
        borderBottom: 1,
        alignContent: 'center',
        alignItems: 'center',

    },

    sectionMid: {
        borderBottom: 1,
        alignContent: 'center',


    },

    sectionBot: {
        flexGrow: 1,
    },
    image: {
        width: 60,
        height: 'auto',

    },
    internalDiv: {
        fontFamily: 'Times-Roman',
        flexDirection: 'column',
        borderRight: 1
    },
    sectionMarks: {
        flexDirection: 'row',
        borderBottom: 1,

    },
    titleBoxes: {
        borderBottom: 1,
        alignContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingRight: 5,
        paddingLeft: 5
    },
    internalDivTitle: {
        fontFamily: 'Times-Roman',
        flexDirection: 'column',
        borderRight: 1,
        flexGrow: 1,
        paddingBottom: 10
    },
    tableRows: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }

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
    ]
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.mainContent}>

                    <View style={styles.sectionTop} >
                        <Image src={img} style={styles.image} />
                        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 15, marginTop: 2 }}>ST. FRANCIS INSTITUTE OF TECHNOLOGY</Text>
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12 }}>(ENGINEERING COLLEGE)</Text>
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 9 }}>Mount Poinsur, Borivli (West), Mumbai - 400103</Text>
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 9, marginBottom: 1 }}>(Affiliated to University of Mumbai)</Text>
                    </View>
                    <View style={styles.sectionMid}>
                        <Text style={{ fontFamily: 'Times-Bold', fontSize: 15, marginTop: 7, alignSelf: 'center' }}>Grade Card</Text>
                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 12, marginLeft: 1 }}>NAME                    :  {data?.student?.name.toUpperCase()}</Text>
                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 12, marginLeft: 1 }}>EXAMINATION    :  {expand_exam[data?.student?.semester - 1]}</Text>
                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 12, marginLeft: 1 }}>HELD IN                :  2024</Text>
                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 12, marginLeft: 1 }}>BRANCH               :  {data?.student?.branch.toUpperCase()}</Text>
                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 12, marginLeft: 1, marginBottom: 10 }}>PID                         :  {data?.student?.pid}</Text>
                    </View>
                    <View style={styles.sectionMarks}>
                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10 }}>COURSE</Text>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9 }}>CODE</Text>
                            </View>
                            <View style={styles.tableRows}>
                                {data?.student && data.student.subject_ids.map((item) => {
                                    return <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                        {item}
                                    </Text>
                                })

                                }
                            </View>
                        </View>
                        <View style={styles.internalDivTitle}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>COURSE TITLE</Text>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                {subjlist?.map(item => {
                                    const subject = data?.subjects?.find(subject => subject.subject_id === item);

                                    return <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                        {subject.subject_name}
                                    </Text>
                                })

                                }
                            </View>
                        </View>
                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>COURSE</Text>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9 }}>CREDIT</Text>
                            </View>
                        </View>
                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>TERM</Text>
                            </View>
                            <View style={styles.tableRows}>
                                {subjlist?.map(item => {


                                    const subject = data?.student?.term[item]

                                    if (subject) {
                                        return <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                            {subject}
                                        </Text>
                                    }
                                    else {
                                        return (
                                            <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                                N/A
                                            </Text>)
                                    }
                                })

                                }
                            </View>
                        // TODO ADD HERE
                        </View>
                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>PR/OR</Text>
                            </View>
                            <View style={styles.tableRows}>
                                {subjlist?.map(item => {


                                    const practical = data?.student?.practical[item]
                                    const oral = data?.student?.oral[item]
                                    if (practical && oral) {
                                        return <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                            {practical + oral}
                                        </Text>
                                    }
                                    else {
                                        return (
                                            <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                                N/A
                                            </Text>)
                                    }
                                })

                                }
                            </View>
                        </View>
                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 8, marginTop: 10, }}>OVERALL</Text>
                            </View>
                            <View style={styles.tableRows}>
                                {subjlist?.map(item => {


                                    const practical = data?.student?.practical[item]
                                    const oral = data?.student?.oral[item]
                                    const term = data?.student?.term[item]
                                    if (practical && oral && term) {
                                        return <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                            {practical + oral + term}
                                        </Text>
                                    }
                                    else {
                                        return (
                                            <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>
                                                N/A
                                            </Text>)
                                    }
                                })

                                }
                            </View>
                        </View>
                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>CREDIT</Text>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9 }}>EARNED</Text>
                            </View>
                        </View>

                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>CREDIT</Text>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9 }}>POINTS</Text>
                            </View>
                        </View>

                        <View style={styles.internalDiv}>
                            <View style={styles.titleBoxes}>
                                <Text style={{ fontFamily: 'Times-Roman', fontSize: 9, marginTop: 10, }}>C X G</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sectionBot}>
                        <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>

                            <Text style={{ fontFamily: 'Times-Bold', fontSize: 9, marginTop: 10, flexGrow: 1 }}>Remark :</Text>
                            <Text style={{ fontFamily: 'Times-Bold', fontSize: 9, marginTop: 10, flexGrow: 1 }}>CGPI :</Text>
                            <Text style={{ fontFamily: 'Times-Bold', fontSize: 9, marginTop: 10, flexGrow: 1 }}>SGPI :</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>

                            <Text style={{ fontFamily: 'Times-Bold', fontSize: 9, marginTop: 10, flexGrow: 1 }}>Result Date :</Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>

                            <Text style={{ fontFamily: 'Times-Bold', fontSize: 9, margin: 10 }}>CHECKED BY</Text>
                            <Text style={{ fontFamily: 'Times-Bold', fontSize: 9, margin: 10, marginRight: 30 }}>PRINCIPAL</Text>

                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
};

export default function Report() {
    const [student, setStudent] = useState();
    React.useEffect(() => {
        axios.post('/jason/get_student', { pid: 222212 }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            setStudent(res.data)
            console.log(res.data)
        })

    }, []);
    return (
        <PDFViewer style={{
            position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 9999
        }}>
            <MyDocument data={student} />
        </ PDFViewer>

    )
}