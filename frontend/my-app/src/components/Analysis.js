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
import axiosInstance from './axiosInstance';

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

const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            suggestedMin: 0,
            suggestedMax: 100
        }
    }
};

const optionsRadar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            suggestedMin: 0,
            suggestedMax: 100
        },
    }
};

export default function Analysis() {
    const [teacherSubjects, setTeacherSubjects] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        axiosInstance.post('/teacher/get_exams', { teacher_id: localStorage.getItem('username') })
            .then((res) => {
                setTeacherSubjects(res.data);
            });
    }, []);

    const handleCheckboxChange = (event, teacherSubject) => {
        const { checked } = event.target;
        const format = { subject: teacherSubject.subject_id, class: teacherSubject.class, marks_type: teacherSubject.marks_type };
        if (checked) {
            setSubjectList(prev => [...prev, format]);
        } else {
            setSubjectList(prev => prev.filter(item =>
                !(item.subject === format.subject && item.class === format.class && item.marks_type === format.marks_type)
            ));
        }
    };

    const makeData = (items) => {
        setData({
            labels: items.labels,
            datasets: [{
                label: 'Average scores per subject',
                data: items.data,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
            }]
        });
    };

    const handleClick = () => {
        axiosInstance.post('/teacher/get_aggregate', { data_list: subjectList })
            .then((res) => {
                makeData(res.data);
            });
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Exam Analysis Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-2">Select Exams</h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {teacherSubjects.map((subject, index) => (
                                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition duration-150 ease-in-out">
                                    <input
                                        id={`exam-${index}`}
                                        type="checkbox"
                                        onChange={(event) => handleCheckboxChange(event, subject)}
                                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
                                    />
                                    <label htmlFor={`exam-${index}`} className="text-sm text-gray-700 font-medium cursor-pointer flex-1">
                                        <span className="block text-gray-900">{subject.subject_id} {subject.subject_name}</span>
                                        <span className="text-xs text-gray-500">{subject.marks_type} - {subject.class}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleClick}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Update Graph
                        </button>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-2">Exam Performance Visualization</h2>
                        <div className="h-96 w-full">
                            {data && (
                                data.labels.length > 2
                                    ? <Radar data={data} options={optionsRadar} />
                                    : <Bar options={optionsBar} data={data} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}