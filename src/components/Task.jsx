import React, { useState } from 'react'
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import grey from '@mui/material/colors/grey';
import trash from '../icons/Trash.svg';
import pensil from '../icons/Edit.svg';
import cancel from '../icons/cancel.svg';
import done from '../icons/done.svg';

const Task = ({ index, task, updateTasks }) => {
  const { _id, text, isCheck } = task;
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(text);

  const deleteTask = async (taskId) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:8000/deleteTask?_id=${taskId}`).then(res => { });
      updateTasks();
    };
  };

  const editCheck = async (editingTask) => {
    const isCheck = editingTask.isCheck;
    const updateTask = { ...editingTask, isCheck: !isCheck }
    await axios.patch('http://localhost:8000/updateTask', updateTask).then(res => { });
    updateTasks();
  };

  const editTask = async (editingTask) => {
    if (value.trim()) {
      const updateTask = { ...editingTask, text: value }
      await axios.patch('http://localhost:8000/updateTask', updateTask).then(res => { });
      updateTasks();
      setIsEdit(!isEdit);
    } else {
      deleteTask(_id);
    }
    
  };

  const cancelSet = () => {
    setIsEdit(!isEdit);
    setValue(text);
  }

  return (
    <div
      className={isCheck ? "task-complete" : "task"}
    >
      <p
        className={isEdit ? 'hidden' : 'task-text'}
      > 
        {`${index + 1}. ${text}`}
      </p>
      <input
        className={isEdit ? 'edit-input': 'hidden'}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className='text-check'>
      <Checkbox
        sx={{
          color: grey[50],
          '&.Mui-checked': {
            color: grey[900],
          },
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
        }}
        type={'checkbox'}
        checked={isCheck}
        className={"task-checkbox"}
        onChange={e => editCheck(task)}
      />
      
      <div className='icons-container'>
        <img
          className={isEdit ? 'icon' : 'hidden'}
          src={done} alt='done'
          onClick={() => editTask(task)}
        />
        <img
          className={isEdit ? 'icon' : 'hidden'}
          src={cancel} alt='cancel'
          onClick={() => cancelSet()}
        />
        <img 
          className={isEdit ? 'hidden' : 'icon'}
          src={pensil} alt='edit'
          onClick={() => setIsEdit(!isEdit)}
        />
        <img
          className={isEdit ? 'hidden' : 'icon'}
          src={trash} alt='delete'
          onClick={() => deleteTask(_id)}
        />
      </div>
      </div>
    </div>
  );
};

export default Task;