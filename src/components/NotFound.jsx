import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.scss';

export const NotFound = ({ text }) => {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      navigate('/', { replace: true });
    }
  });

  return (
    <section>
      <div className='bottle'>
        <div className='shadow'></div>
        <div className="bowl">
          <div className="liquid"></div>
        </div>
      </div>
      <h1 className='text-notFound'>{text || 'Page not found'}</h1>
      <h2 className='text-notFound'>Redirect to the main page via:</h2>
      <h2 className='timer-element'>{timer} {timer > 1 ? "seconds" : "second"}</h2>
    </section>
  )
}

export default NotFound;