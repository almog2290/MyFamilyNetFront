import { useState, useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { ReportSharp } from "@mui/icons-material";

export const useGetPrivate = () => {
  const [data, setData] = useState(null);
  // const [isPending, setIsPending] = useState(false);
  // const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

    const fetchData = async (url , setIsPending , setError) => {
      setIsPending(true);

      try {

        const response = await axiosPrivate.get(url);

        if (!response.data) {
          throw new Error("No data available");
        }

        setData(response.data);
        setError(null);
        
      } catch (err) {
        console.log(err);
        console.log(err.message);
        setError(err.message);
      }finally{
        setIsPending(false);
      }
      
    };

  return { fetchData , data };
};