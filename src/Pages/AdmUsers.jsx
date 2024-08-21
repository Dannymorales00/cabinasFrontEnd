import { useEffect, useState, useContext, useCallback } from 'react'
import axios from './../Axios/configAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TblUsers from '../components/TblUsers';
import NavDashBoard from './../components/NavDashBoard';


const AdmUsers = () => {

    const [Users, setUsers] = useState(null);
    const { token, auth } = useContext(AuthContext)
    const navigate = useNavigate();

    const getUsers = useCallback(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        };

        axios.get(`users/`, config).then((response) => {
            //    console.log(response);
            if (response.status === 200) {
                // console.log(response);
                setUsers(response.data)
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                return navigate("/login");
            }
            if (error.response.status === 404) {
               return navigate("/");
            }
            console.log(error)
            //toast.error("Ocurrió un error inesperado "+ error.response.data.error);
            return toast.error("problema de conexión detectado");
        });

    }, [navigate, token])

    useEffect(() => {
        if (!Users) {
            getUsers()
        }

    }, [Users, auth.id, getUsers, navigate, token]);



    return (
        <>
            <header className="site-header m-0 p-0">
                <NavDashBoard />
            </header>
            <div className="container">
                <ToastContainer theme="light" position="bottom-right" />
                {Users ? <TblUsers users={Users} getUsers={getUsers} /> : null}
            </div>
        </>
    )
}

export default AdmUsers