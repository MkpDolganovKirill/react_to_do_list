import React, { useState } from 'react'
import axios from 'axios';
import '../styles/Task.scss';
import Checkbox from '@mui/material/Checkbox';
import grey from '@mui/material/colors/grey';
import trash from '../icons/Trash.svg';
import pensil from '../icons/Edit.svg';
import cancel from '../icons/cancel.svg';
import done from '../icons/done.svg';
import SnackAllert from './SnackAllert';
import { useNavigate } from 'react-router-dom';

const Task = ({ index, task, updateTasks, activateDeleteAlert, closeAlertEarlier }) => {
  const { _id, text, isCheck } = task;
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(text);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const closeAlert = () => {
    setOpenAlert(false);
  }

  const deleteTask = async (taskId) => {
    closeAlertEarlier();
    activateDeleteAlert(task);
    await axios.delete(`http://localhost:8000/deleteTask?_id=${taskId}`).then(res => { });
    updateTasks();
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
      setOpenAlert(true);
      setValue(text);
    }

  };

  const cancelSet = () => {
    setIsEdit(!isEdit);
    setValue(text);
  }

  const checkEnter = (event) => {
    if (event.code === "Enter") editTask(task);
  };

  return (
    <div
      className={isCheck ? "task-complete" : "task"}
      onDoubleClick={() => !isCheck ? setIsEdit(!isEdit) : {}}
    >
      <p
        className={isEdit ? 'hidden' : 'task-text'}
      >
        {`${index + 1}. ${text}`}
      </p>
      <input
        className={isEdit ? 'edit-input' : 'hidden'}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={(e) => { checkEnter(e) }}
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

        <div className='edit'>
          <img
            className={isEdit ? 'icon' : 'hidden'}
            src={done} alt='done'
            onClick={() => editTask(task)}
          />
          <img
            className={isEdit || isCheck ? 'hidden' : 'icon'}
            src={pensil} alt='edit'
            onClick={() => navigate(`/tasks/${_id}`)}
          />

        </div>
        <div className='delete'>
          <img
            className={isEdit ? 'icon' : 'hidden'}
            src={cancel} alt='cancel'
            onClick={() => cancelSet()}
          />
          <img
            className={isEdit ? 'hidden' : 'icon'}
            src={trash} alt='delete'
            onClick={() => deleteTask(_id) }
          />
        </div>
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

export default Task;