import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    BarElement,
    LinearScale,
    CategoryScale,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import axios from 'axios'
import { Box, Button } from '@mui/material';


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LinearScale,
    CategoryScale,
    LineElement,
    BarElement,
    Filler,
    Tooltip,
    Legend
);


// export const data = {
//     labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
//     datasets: [

//         {
//             label: '# of Votes',
//             data: [1.5, 9, 3, 5, 3, 3],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 3,
//         },
//     ],
// };

const optionsBar = {
    responsive: true,
    pointBorderWidth: 3,
    scales: {
        y: {
            // Configuration for the y-axis
            suggestedMin: 0,
            suggestedMax: 100
        }
    }
};
const optionsRadar = {
    responsive: true,
    pointBorderWidth: 3,
    scales: {
        r: {
            suggestedMin: 0,
            suggestedMax: 100
        },

    }
};

export default function Analysis() {

    const [teacherSubjects, setTeacherSubjects] = useState()
    const [subjectList, setSubjectList] = useState([])
    const [data, setData] = useState()
    useEffect(() => {
        axios.post('/jason/get_exams', { teacher_id: localStorage.getItem('username') }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            console.log(res.data)
            setTeacherSubjects(res.data)
        })
    }, [])
    const handleCheckboxChange = (event, teacherSubject) => {
        const { checked } = event.target;
        console.log(checked)
        const format = { subject: teacherSubject.subject_id, class: teacherSubject.class, marks_type: teacherSubject.marks_type }
        if (checked) {
            // If checkbox is checked, add the teacherSubject to subjectList
            setSubjectList([...subjectList, format]);

        } else {
            // If checkbox is unchecked, remove the teacherSubject from subjectList
            console.log(format)
            setSubjectList(subjectList.filter(item => !((item.subject === format.subject) && (item.class === format.class) && (item.marks_type === format.marks_type))));
        }
        console.log(subjectList)
    };
    const makeData = (items) => {
        let tempJSON = {};
        tempJSON['labels'] = items.labels
        tempJSON['datasets'] = [{
            label: 'average scores per subject.',
            data: items.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
        }]
        setData(tempJSON)
    }
    const handleClick = () => {
        axios.post('/jason/get_aggregate', { data_list: subjectList }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            console.log(res.data)
            makeData(res.data)
        })
    }
    return (
        <>
            <div className=''>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 70, flexWrap: 'wrap' }} >

                    {teacherSubjects ? teacherSubjects.map((teacherSubject, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    onChange={(event) => handleCheckboxChange(event, teacherSubject)}
                                    type="checkbox"
                                />
                                {`${teacherSubject.subject_id} ${teacherSubject.subject_name}, ${teacherSubject.marks_type} - ${teacherSubject.class} `}
                            </label>
                        </div>
                    )) : <></>}
                </div>
                <Button variant='contained' onClick={handleClick}>
                    update Graph
                    <br />
                </Button >
                <Box sx={{ minHeight: '80vh', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    {data ?
                        (data.labels.length > 2) ?
                            <Radar data={data} options={optionsRadar} /> :
                            <Bar options={optionsBar} data={data} />

                        : <></>
                    }
                </Box>
            </div>
        </>
    )
}