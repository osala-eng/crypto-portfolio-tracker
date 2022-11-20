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
function App({ testv }: { testv?: undefined | number }) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  /**
   * Fetch function call
   * @param userName User object with username: string
   */
  /* istanbul ignore next */
  const fetchCall = async (userName: User) => {
    setIsloading(true);
    await fetch(Url, {
      method: 'POST',
      body: JSON.stringify(userName),
    })
      .then((res) => {
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
    setTimeout(() => {
      setIsLoaded(false);
      setError(false);
    }, 10000);
  }, [isLoaded]);

  return (
    <div className='App'>
      {((isLoaded && !error) || testv === 2) && <SubmitSuccess />}
      {(isLoading || testv === 1) && <Waiting />}
      {((isLoaded && error) || testv === 3) && <SubmitError />}
      <Form fetchCall={fetchCall}/>
    </div>
  );
};

export default App;
