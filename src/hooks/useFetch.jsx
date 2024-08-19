import { useState, useEffect } from 'react';
import axios from 'api/axios';

const useFetch = (url) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);

        if (response.status !== 200) {
          throw new Error('An error occurred while fetching data');
        }

        setData(response.data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;