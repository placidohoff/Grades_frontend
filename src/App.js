import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentDisplay from './StudentDisplay';
import localStudents from './data/students.json';



function App() {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [studentOnDisplay, setStudentOnDisplay] = useState();

  useEffect(() => {
    getStudents();
    // getStudentsLocal();
  }, []);

  const getStudents = () => {
    axios
      .get("https://localhost:44309/api/Student")
      .then((response) => {
        console.log(response);
        setStudents(response.data.result);
      })
      .catch((error) => {
        console.log("Error with fetch")
      });
  }

  const getGrades = () => {
    axios
      .get("https://localhost:44309/api/Grade")
      .then((response) => {
        console.log(response);
        setGrades(response.data.result);
      })
      .catch((error) => {
        console.log("Error with fetch")
      });
  }

  const getStudentsLocal = () => {
    // axios.get('./data/students.json')
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error))

    setStudents(localStudents);
  }

  const Student = ({ student }) => {
    return (
      <div 
      onClick={() => setStudentOnDisplay(student)}
      style={{border: "1px solid", borderRadius: "5px", marginBottom: "5px", maxWidth: "300px"}}
      >
        <p>{student.firstname + ' ' + student.lastname }</p> 
        {/* <p className='bold underline'>Grades</p> */}
      </div>
    )
  }

  

  return (

    <div className="App container">
      <h1>Welcome to the School Admin Page</h1>
      <div className='row'>
        <div className='col'>Students
          {
            students.map((student, index) => (
              <Student key={index} student={student} />
            ))
          }
        </div>
        <div className='col'>
          <StudentDisplay student={studentOnDisplay} />
        </div>
        {/* <div className='col'>1</div> */}
      </div>
    </div>
  );
}

export default App;
