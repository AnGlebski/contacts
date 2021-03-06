import { useState, useEffect } from 'react';

export const useContacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContact = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://randomuser.me/api/?results=22")
        const { results, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        setData(results);
        setIsError(false);
      } catch (e) {
          setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContact();
  },[]);

  return {
    data,
    isLoading,
    isError
  };
};
