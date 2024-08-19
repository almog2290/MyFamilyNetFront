import { useState, useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useAxiosGet = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {

        const response = await axiosPrivate.get(url, {
          signal: controller.signal,
        });

        setData(response.data);
        setIsPending(false);
        setError(null);
        
      } catch (err) {
        if (err.response && err.response.status === 403) {
            setError('Access forbidden: You do not have permission to access this data');
        } else {
            setError('Could not fetch the data');
        }
      }finally{
        setIsPending(false);
      }
      
    };

    fetchData();

    //cleanup function
    return () => {
        controller.abort();
    };

  }, [url]);

  return { data, isPending, error };
};