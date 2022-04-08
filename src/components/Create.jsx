import React, { useState } from 'react';
import '../styles/Create.scss';

const Create = ({ create }) => {

  const [value, setValue] = useState('');

  const createTask = () => {
    if (value.trim()) {
      const newTask = {
        text: value.trim(),
        isCheck: false
      }
      create(newTask);
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
      <h1 className="title">TO-DO LIST</h1>
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