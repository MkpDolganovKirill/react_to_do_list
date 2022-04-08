import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Create.scss';

const Create = ({ updateTasks }) => {

  const [value, setValue] = useState('');

  const createTask = async () => {
    if (value.trim()) {
      const newTask = {
        text: value.trim(),
        isCheck: false
      }
      await axios.post('http://localhost:8000/createTask', newTask).then(res => { });
      updateTasks();
      setValue('');
    } else {
      alert("You can't add empty task! Please enter something...");
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
    </div>
  );
};

export default Create;