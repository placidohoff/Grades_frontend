import React, { use, useEffect, useState } from 'react'
import gradesLocal from "./data/grades.json"
import subjectsLocal from "./data/subjects.json"

export default function StudentDisplay({ student }) {
    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [gradesForStudent, setGradesForStudent] = useState([]);
    const [isAddingGrade, setIsAddingGrade] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("")

    useEffect(() => {
        getGrades();
        getSubjects();


    }, [])

    useEffect(() => {
        assignGradesToSubjects();
        setIsAddingGrade(false);
    }, [student])

    const getGrades = () => {
        setGrades(gradesLocal);
    }

    const getSubjects = () => {
        setSubjects(subjectsLocal);
    }

    //Could be made better with redux, have all subjects, grades, etc be pulled in by global store.
    const assignGradesToSubjects = () => {
        if (student) {
            const filteredGrades = gradesLocal.filter(
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
                <div style={{borderTop: '1px solid'}}>
                    {gradesForStudent.map(grade => (
                        <div className='d-flex justify-content-around' style={{borderBottom: '1px solid'}}>
                            <p>{subjectMap[grade.subject_ID]}</p>
                            <p>{grade.score}</p>
                        </div>
                    ))}
                    {
                        isAddingGrade &&
                        <div>
                            <hr />
                            <p>Add Grade</p>
                            <div className='d-flex justify-content-between mx-auto' style={{maxWidth: "85%"}}>
                                <label htmlFor="subject">Choose subject: &nbsp; </label>
                                <select
                                    id="subject"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.subjectName}>
                                            {subject.subjectName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className='d-flex justify-content-between mx-auto' style={{maxWidth: "85%"}}> 
                                <label htmlFor="grade">Enter grade: &nbsp;</label>
                                <input id='grade' type="number" style={{maxWidth: "25%"}} />
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
                                onClick={() => { }}
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

