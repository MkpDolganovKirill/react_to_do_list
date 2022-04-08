import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Create from './components/Create';
import Tasks from './components/Tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    await axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    })
  };

  const createNewTask = async (newTask) => {
    await axios.post('http://localhost:8000/createTask', newTask).then(res => { });

    await axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  };

  return (
    <div className="App">
      <Create create={createNewTask} />
      <Tasks allTasks={tasks} />
    </div>
  );
};

export default App;
