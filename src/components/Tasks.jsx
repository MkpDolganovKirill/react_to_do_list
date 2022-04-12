import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Tasks.scss';
import SnackDeleteAlert from './SnackDeleteAlert';
import Task from './Task';

const Tasks = ({ allTasks, updateTasks }) => {
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [deletedTaskSave, setDeletedTaskSave] = useState({});

  const closeDeleteTask = () => {
    setOpenDeleteTask(false);
  }

  const activateDeleteAlert = (deletedTask) => {
    setOpenDeleteTask(true);
    setDeletedTaskSave(deletedTask);
  }

  const undoDeletedTask = () => {
    axios.post('http://localhost:8000/createTask', deletedTaskSave).then(res => {
      updateTasks();
      closeDeleteTask();
     });
  }

  return (
    <div className='tasks'>
      {
        allTasks.map((task, index) => <Task
          key={task._id}
          index={index}
          task={task}
          updateTasks={updateTasks}
          activateDeleteAlert={activateDeleteAlert}
          closeAlertEarlier={closeDeleteTask}
        />
        )
      }
      <SnackDeleteAlert
        messageAlert={`Task deleted for list!`}
        open={openDeleteTask}
        handleClose={closeDeleteTask}
        undo={undoDeletedTask}
      />
    </div>
  );
};

export default Tasks;