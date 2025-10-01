import React, { use, useEffect, useState } from 'react'
import gradesLocal from "./data/grades.json"
import subjectsLocal from "./data/subjects.json"
import axios from 'axios';

export default function StudentDisplay({ student }) {
    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [gradesForStudent, setGradesForStudent] = useState([]);
    const [isAddingGrade, setIsAddingGrade] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [gradeScore, setGradeScore] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        getGrades();
        getSubjects();


    }, [])


    useEffect(() => {
        getGrades();
        assignGradesToSubjects();
        setIsAddingGrade(false);
        setGradeScore(0)

    }, [refreshKey])

    useEffect(() => {
        assignGradesToSubjects();
        setIsAddingGrade(false);
        setGradeScore(0)
    }, [student, refreshKey])

    const getGrades = () => {
        // setGrades(gradesLocal);
        axios
            .get("https://localhost:44309/api/Grade")
            .then((response) => {
                console.log(response.data.result);
                setGrades(response.data.result);
            })
            .catch((error) => {
                console.log("Error with fetch")
            });
    }

    const getSubjects = () => {
        // setSubjects(subjectsLocal);
        axios
            .get("https://localhost:44309/api/Subject")
            .then((response) => {
                // console.log(response);
                setSubjects(response.data.result);
            })
            .catch((error) => {
                console.log("Error with fetch")
            });
    }

    const saveGrade = async (e) => {
        //Validate before sending

        // e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("Subject_ID", selectedSubject);
            formData.append("Student_ID", student.student_ID);
            formData.append("Score", gradeScore);

            const response = await axios.post(
                "https://localhost:44309/api/Grade",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Grade added:", response.data);
            getGrades();
            assignGradesToSubjects();
            setIsAddingGrade(false);
            setGradeScore(0)
        } catch (error) {
            console.error("Error adding grade:", error.response?.data || error.message);
        }
    }

    //Could be made better with redux, have all subjects, grades, etc be pulled in by global store.
    const assignGradesToSubjects = () => {
        if (student) {
            // const filteredGrades = gradesLocal.filter(
            const filteredGrades = grades.filter(
                (grade) => grade.student_ID === student.student_ID
            );
            setGradesForStudent(filteredGrades); // replace instead of append
        } else {
            setGradesForStudent([]); // clear if no student
        }
    }

    const subjectMap = {
        1: "Math",
        2: "Science",
    };

    return (
        student ?
            <div style={{ border: "1px solid", borderRadius: '5px' }}>
                <b>{student.firstname + ' ' + student.lastname}</b><br />
                <u>Grades</u>
                <div style={{ borderTop: '1px solid' }}>
                    {gradesForStudent.map(grade => (
                        <div key={grade.grade_ID} className='d-flex justify-content-around' style={{ borderBottom: '1px solid' }}>
                            <p>{subjectMap[grade.subject_ID]}</p>
                            <p>{grade.score}</p>
                        </div>
                    ))}
                    {
                        isAddingGrade &&
                        <div>
                            <hr />
                            <p>Add Grade</p>
                            <div className='d-flex justify-content-between mx-auto' style={{ maxWidth: "85%" }}>
                                <label htmlFor="subject">Choose subject: &nbsp; </label>
                                <select
                                    id="subject"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.subject_ID}>
                                            {subject.subjectName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className='d-flex justify-content-between mx-auto' style={{ maxWidth: "85%" }}>
                                <label htmlFor="grade">Enter grade: &nbsp;</label>
                                <input value={gradeScore} onChange={e => setGradeScore(e.target.value)} id='grade' type="number" style={{ maxWidth: "25%" }} />
                            </div>

                            {/* <p>Selected: {selectedSubject}</p> */}
                        </div>
                    }
                    {
                        !isAddingGrade &&
                        <button
                            onClick={() => setIsAddingGrade(true)}
                            className='my-3 rounded text-sm'>
                            Add Grade
                        </button>
                    }
                    {
                        isAddingGrade &&
                        <div className=''>
                            <button
                                onClick={(e) => { saveGrade(e) }}
                                className='my-3 rounded text-sm'>
                                Save Grade
                            </button> <br />
                            <button
                                onClick={() => setIsAddingGrade(false)}
                                className='my-3 rounded text-sm'>
                                Cancel
                            </button>
                        </div>
                    }

                </div>
                {/* {console.log(gradesForStudent)} */}
            </div>
            :

            null
    )
}

