import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Create.scss';
import SnackAllert from './SnackAllert';

const Create = ({ updateTasks, lostConnect }) => {

  const [value, setValue] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const closeAlert = () => {
    setOpenAlert(false);
  }

  const createTask = () => {
    if (value.trim()) {
      const newTask = {
        text: value.trim(),
        isCheck: false
      };
      axios.post('http://localhost:8000/createTask', newTask).then(res => {
        updateTasks();
        setValue('');
      }).catch(err => {
        if (err) updateTasks();
      });
    } else {
      setOpenAlert(true);
    };
  };

  const checkEnter = (event) => {
    if (event.code === "Enter") createTask();
  };

  return (
    <div className="create-component">
      <div className="create-form">
        <input
          type={'text'}
          value={value}
          className="create-form-input"
          placeholder='Enter your task'
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { checkEnter(e) }}
        />
        <button className='create-form-button' onClick={createTask}>create task</button>
      </div>
      <SnackAllert
        allertMessage={`You can't add empty task! Please, enter something...`}
        open={openAlert}
        onClose={closeAlert}
        type={'error'}
      />
    </div>
  );
};

export default Create;