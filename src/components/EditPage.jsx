import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import cancel from '../icons/cancel.svg';
import done from '../icons/done.svg';
import NotFound from './NotFound';
import SnackAllert from './SnackAllert';


const EditPage = ({ updateTasks }) => {
  const { _id } = useParams();
  const [task, setTask] = useState({});
  const [allertActive, setAllertActive] = useState(false);
  const [allertActiveErr, setAllertActiveErr] = useState(false);
  const navigate = useNavigate();

  const closeAlert = () => {
    setAllertActive(false);
    navigate('/', { replace: true })
  }

  const closeAlertErr = () => {
    setAllertActiveErr(false);
  }

  useEffect(() => {
    findTask(_id);
  }, [_id]);

  const findTask = async (id) => {
    await axios.get(`http://localhost:8000/getTaskById?_id=${id}`).then(res => {
      res.data !== 'Not found' ? setTask(res.data) : setTask(null);
    });
  };

  const editTask = async () => {
    if (task.text.trim()) {
      const updateTask = { ...task, text: task.text }
      await axios.patch('http://localhost:8000/updateTask', updateTask).then(res => { });
      updateTasks();
      setAllertActive(true);
    } else {
      setAllertActiveErr(true);
    };
  };

  const checkEnter = (event) => {
    if (event.code === "Enter") editTask();
  };

  return (
    <div>
      {task ? <div className='task-edit-page'>
      <input
        className='edit-page-input'
        type={'text'}
        value={task.text || ''}
        onChange={(e) => setTask({ ...task , text: e.target.value})}
        onKeyDown={(e) => { checkEnter(e) }}
      />
      <img
        className={'icon'}
        src={done} alt='done'
        onClick={() => editTask()}
      />
      <img
        className={'icon'}
        src={cancel} alt='cancel'
          onClick={() => { navigate('/', { replace: true }) }}
      />
    </div> :
    <NotFound text={'Task not found'}/>}
    <SnackAllert 
      allertMessage={'Task save!'}
      type={'success'}
      onClose={closeAlert}
      open={allertActive}
    />
    <SnackAllert
      allertMessage={"You can't save empty task!"}
      type={'error'}
      onClose={closeAlertErr}
      open={allertActiveErr}
    />
    </div>
  )
};

export default EditPage;