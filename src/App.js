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
      sortTasks(res.data.data);
    })
  };

  const createNewTask = async (newTask) => {
    await axios.post('http://localhost:8000/createTask', newTask).then(res => { });

    await axios.get('http://localhost:8000/allTasks').then(res => {
      sortTasks(res.data.data);
    });
  };

  const editTask = async (editingTask) => {
    const newTasks = [...tasks];
    const isCheck = editingTask.isCheck;
    const updateTask = { ...editingTask, isCheck: !isCheck }
    await axios.patch('http://localhost:8000/updateTask', updateTask).then(res => { });

    newTasks.forEach((el, index) => {
      if (el._id === updateTask._id) {
        newTasks[index] = updateTask;
      };
    });
    sortTasks(newTasks);
  };

  const deleteTask = async (taskId) => {
    const newTasks = [...tasks];
    await axios.delete(`http://localhost:8000/deleteTask?_id=${taskId}`).then(res => { });

    newTasks.forEach((el, index) => {
      if (el._id === taskId) {
        newTasks.splice(index, 1);
      };
    });
    setTasks(newTasks);
  };

  const sortTasks = (sortingTasks) => {
    const newTasks = [...sortingTasks];
    newTasks.sort((a, b) => {
      return a.isCheck < b.isCheck ? -1 : 1;
    });

    setTasks(newTasks);
  };

  return (
    <div className="App">
      <Create create={createNewTask} />
      <Tasks allTasks={tasks} edit={editTask} remove={deleteTask} />
    </div>
  );
};

export default App;
