import { useState, useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useAxiosPost = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const postDataAsync = async (url, data) => {
        setIsPending(true);
        try {
            const response = await axiosPrivate.post(url, data)

            console.log(response);

            if (![200, 201, 204].includes(response.status)) {
                setIsPending(false);
                setError(response.data.error || 'Could not complete login process');
                return;
            }

            setIsPending(false);
        } catch (error) {
            setIsPending(false);
            console.log(error);
            setError(error.message);
        }
    };

    return { postDataAsync, isPending, error };
};