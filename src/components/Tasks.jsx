import React from 'react';
import '../styles/Tasks.scss';
import Task from './Task';

const Tasks = ({ allTasks, updateTasks }) => {

  return (
    <div className='tasks'>
      {
        allTasks.map((task, index) => <Task 
          key={task._id}
          index={index}
          task={task} 
          updateTasks={updateTasks}
        />
        )
      }
    </div>
  );
};

export default Tasks;