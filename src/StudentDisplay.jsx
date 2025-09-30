import React, { useEffect, useState } from 'react'

export default function StudentDisplay({ student }) {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        getGrades();
        getSubjects();
    }, [])

    const getGrades = () => {

    }

    const getSubjects = () => {

    }

    return (
        <div>
            {student ? student.firstname : null}
        </div>
    )
}

