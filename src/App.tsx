import React, { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/Form';
import { SubmitError, SubmitSuccess, Waiting } from './components/Messages';
import { Url } from './utils/config';
import { User } from './utils/types';

/**
 * React app
 * @returns JSX App
 */
function App({ testv }: { testv?: number }) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [mess, setMess] = useState(0);

  /**
   * Fetch function call
   * @param userName User object with username: string
   */
  /* istanbul ignore next */
  const fetchCall = async (userName: User) => {
    setIsloading(true);
    await fetch(Url, {
      method: 'POST',
      body: JSON.stringify(userName)
    })
      .then(res => {
        if (res.status === 400) {
          throw new Error();
        }
        setIsloading(false);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsloading(false);
        setIsLoaded(true);
        setError(true);
      });
  };

  /**
   * Allow pop message to dissapear after 10s
   */
  /* istanbul ignore next */
  useEffect(() => {
    if (isLoaded && !error) {
      setMess(1);
    }
    else if (isLoaded && error) {
      setMess(2);
    }
    setTimeout(() => {
      setIsLoaded(false);
      setError(false);
      setMess(0);
    }, 10000);
  }, [isLoaded, error]);

  return (
    <div className='App'>
      {(mess === 1 || testv! === 2) && <SubmitSuccess data-testid='pop-up' />}
      {(isLoading || testv! === 1) && <Waiting />}
      {(mess === 2 || testv! === 3) && <SubmitError data-testid='pop-up' />}
      <Form fetchCall={fetchCall} />
    </div>
  );
};

export default App;
