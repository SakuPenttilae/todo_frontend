import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
const URL = "http://localhost/todo/"

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        //console.log(response.data)
        setTasks(response.data)
      }).catch(error => {
        //yhden rivin if else lause
        alert(error.response ? error.response.data.error : error)
        /*if (error.response) {
          alert(error.response.data.error)
        } else {
          alert(error)
        }*/
      }) 
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task})
    axios.post(URL+"add.php", json, {
      headers: {
        "Content-Type" : "application/json"
      }
    }) .then((response) => {
      setTasks(tasks => [...tasks, response.data])
      setTask("")
    }).catch(error => {
      alert(error.response ? error.response.data.error : error)
    })
  }

  return (
    <div>
      <form onSubmit={save}>
        <label>New Task</label>
        <input value={task} placeholder='laita uutta täskiä' onChange={e => setTask(e.target.value)}/>
        <button>save</button>
      </form>
      <ol>
        {tasks?.map(task => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
