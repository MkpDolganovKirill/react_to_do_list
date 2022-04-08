import React from 'react'
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import grey from '@mui/material/colors/grey';
import trash from '../icons/Trash.svg'

const Task = ({ index, task, updateTasks }) => {
  const { _id, text, isCheck } = task;

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${taskId}`).then(res => { });
    updateTasks();
  };

  const editTask = async (editingTask) => {
    const isCheck = editingTask.isCheck;
    const updateTask = { ...editingTask, isCheck: !isCheck }
    await axios.patch('http://localhost:8000/updateTask', updateTask).then(res => { });
    updateTasks();
  };

  return (
    <div
      className={isCheck ? "task-complete" : "task"}
    >
      <p
        className='task-text'
      >
        {`${index + 1}. ${text}`}
      </p>
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
        onChange={e => editTask(task)}
      />
      <img
        className={isCheck ? 'trash-icon-complete' : 'trash-icon'}
        src={trash} alt='delete'
        onClick={() => deleteTask(_id)}
      />
    </div>
  );
};

export default Task;