import { createContext, useState } from "react";
import axios from '../Axios/configAxios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleAuth = (tokenData) => {
        if (tokenData) {
            setTokenSession(tokenData);
            setToken(tokenData.token);
            getUserToken(tokenData.token);
        } else {
            removeSession();
        }
    }

    const getTokenSession = () => {
        return JSON.parse(sessionStorage.getItem("session"));
    }

    const setTokenSession = (tokenData) => {
        sessionStorage.setItem("session", JSON.stringify(tokenData));
    }

    const removeSession = () => {
        setAuth(null)
        setToken(null)
        sessionStorage.removeItem("session");
    }

    const session = () => {
        const tokenLocalStorage = getTokenSession();
        if (tokenLocalStorage) {
            setToken(tokenLocalStorage.token)
            getUserToken(tokenLocalStorage.token)
        } else {
            setLoading(false);
        }
    }

    const getUserToken = (token) => {

        const config = {
            headers: {
                Authorization: 'Bearer ' + token + ''
            }
        }
        axios.get('users/getUserToken/', config)
            .then(res => {
                // console.log(res.data)
                setAuth(res.data.tokenData);
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.response.data.error);
                removeSession()
            })
            .finally(() => { setLoading(false); })
    }

    return <AuthContext.Provider value={{ loading, auth, token, handleAuth, session }}>{children}</AuthContext.Provider>
}

export { AuthProvider };
export default AuthContext;