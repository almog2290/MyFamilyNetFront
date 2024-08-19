import { useEffect , useContext } from 'react';
import { axiosPrivate } from '../api/axios';
import { AuthContext } from '../context/AuthContext';


export const useAxiosPrivate = () => {
    const {keycloak} = useContext(AuthContext)

    useEffect(() => {
        
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${keycloak?.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403) || (error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    await keycloak.updateToken(30);
                    prevRequest.headers['Authorization'] = `Bearer ${keycloak?.token}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [keycloak])

    return axiosPrivate;
}