import React from 'react';
import trash from '../icons/Trash.svg'
import '../styles/Tasks.scss';
import Checkbox from '@mui/material/Checkbox';
import grey from '@mui/material/colors/grey';

const Tasks = ({ allTasks, remove }) => {

  return (
    <div className='tasks'>
      {
        allTasks.map((task, index) => {
          const { _id, text, isCheck } = task;
          return (
            <div key={_id} className={isCheck ? "task-complete" : "task"}>
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
              />
              <img
                className={isCheck ? 'trash-icon-complete' : 'trash-icon'}
                src={trash} alt='delete'
                onClick={() => remove(_id)}
              />
            </div>
          );
        })
      }
    </div>
  );
};

export default Tasks;