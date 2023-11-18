
import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDashBoard from './../components/NavDashBoard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './../context/AuthContext';
import axios from './../Axios/configAxios';
import DashboardCharts from './../components/DashboardCharts';

const Dashboard = () => {
    const [Reservations, setReservations] = useState(null);
    const [Rooms, setRooms] = useState(null);
    const { token, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const getReservations = useCallback(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(`reservations/`, config).then((response) => {
            if (response.status === 200) {
                console.log(response);
                setReservations(response.data)
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate("/login");
            }
            if (error.response.status === 403) {
                navigate("/");
            }
            console.log(error)
            toast.error("problema de conexión detectado");
        });
    }, [navigate, token])

    const getRooms = useCallback(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(`rooms/`, config).then((response) => {
            if (response.status === 200) {
                console.log(response);
                setRooms(response.data)
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate("/login");
            }
            if (error.response.status === 403) {
                navigate("/");
            }
            console.log(error)
            toast.error("problema de conexión detectado");
        });
    }, [navigate, token])

    useEffect(() => {
        getReservations()
        getRooms()
    }, [auth.id, getReservations, getRooms, navigate, token]);
    return (
        <>
            <ToastContainer theme="light" position="bottom-right" />
            <header className="site-header m-0 p-0">
                <NavDashBoard />
            </header>
            {Reservations && Rooms ? <DashboardCharts reservations={Reservations} rooms={Rooms} /> : null}
        </>
    )
}
export default Dashboard