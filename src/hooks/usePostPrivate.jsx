import { useState, useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const usePostPrivate = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const postDataAsync = async (url, data) => {
        setIsPending(true);
        try {

            const response = await axiosPrivate.post(url, data)

            console.log(response);

            setError(null);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        finally {
            setIsPending(false);
        }

    };

    return { postDataAsync, isPending, error };
};