import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import cancel from '../icons/cancel.svg';
import done from '../icons/done.svg';
import NotFound from './NotFound';
import SnackAllert from './SnackAllert';

const EditPage = ({ updateTasks, connectionFlag }) => {
  const { _id } = useParams();
  const [task, setTask] = useState({});
  const [allertActive, setAllertActive] = useState({
    open: false,
    type: 'error',
    allertMessage: '',
    goToMain: true
  });
  const { open, type, allertMessage, goToMain } = allertActive;
  const { text } = task;
  const navigate = useNavigate();

  const closeAlert = () => {
    setAllertActive({ ...allertActive, open: false });
    if (goToMain) navigate('/', { replace: true });
  }

  useEffect(() => {
    findTask(_id);
  }, [_id]);

  const findTask = (id) => {
    axios.get(`http://localhost:8000/getTaskById?_id=${id}`).then(res => {
      setTask(res.data);
    }).catch(reason => {
      if (reason.response === undefined) updateTasks();
      if (reason.response.status === 404) {
        setTask({ text: null });
      }
    });
  };

  const editTask = () => {
    if (text.trim()) {
      axios.patch('http://localhost:8000/updateTask', { ...task, text }).then(res => {
        updateTasks();
        setAllertActive({
          open: true,
          type: 'success',
          allertMessage: 'Task save!',
          goToMain: true
        });
      }).catch(err => {
        if (err) updateTasks();
      });
    } else {
      setAllertActive({
        open: true,
        type: 'error',
        allertMessage: "You can't enter empty value!",
        goToMain: false
      });
    };
  };

  const checkEnter = (event) => {
    if (event.code === "Enter") editTask();
  };

  return (
    <div>
      {text ? <div className='task-edit-page'>
        <input
          className='edit-page-input'
          type='text'
          value={text || ''}
          onChange={(e) => setTask({ ...task, text: e.target.value })}
          onKeyDown={(e) => checkEnter(e)}
        />
        <img
          className='icon'
          src={done}
          alt='done'
          onClick={() => editTask()}
        />
        <img
          className='icon'
          src={cancel}
          alt='cancel'
          onClick={() => navigate('/', { replace: true })}
        />
      </div> :
        <NotFound text={connectionFlag ? 'Lost connection...' : 'Task not found'} />}
      <SnackAllert
        allertMessage={allertMessage}
        type={type}
        onClose={closeAlert}
        open={open}
      />
    </div>
  )
};

export default EditPage;