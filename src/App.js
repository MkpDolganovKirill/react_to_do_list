import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Create from './components/Create';
import Tasks from './components/Tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(true);

  useEffect(() => {
    if (updateFlag) connect();
  }, [updateFlag]);

  const connect = async () => {
    await axios.get('http://localhost:8000/allTasks').then(res => {
      sortTasks(res.data.data);
    });
    updateTasks();
  };

  const sortTasks = (sortingTasks) => {
    const newTasks = [...sortingTasks];
    newTasks.sort((a, b) => {
      return a.isCheck < b.isCheck ? -1 : 1;
    });

    setTasks(newTasks);
  };

  const updateTasks = () => {
    setUpdateFlag(!updateFlag);
  };

  return (
    <div className="App">
      <h1 className="title">TO-DO LIST</h1>
      <Create updateTasks={updateTasks} />
      <Tasks allTasks={tasks} updateTasks={updateTasks} />
    </div>
  );
};

export default App;
