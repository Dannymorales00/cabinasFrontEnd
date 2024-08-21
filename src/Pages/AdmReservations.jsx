import { useEffect, useState, useContext, useCallback } from 'react'
import axios from './../Axios/configAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TblAdmReservations from '../components/TblAdmReservations';
import NavDashBoard from './../components/NavDashBoard';


const AdmReservations = () => {

    const [Reservations, setReservations] = useState(null);
    const { token, auth } = useContext(AuthContext)
    const navigate = useNavigate();

    const getReservations = useCallback(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.get(`reservations/`, config).then((response) => {
            if (response.status === 200) {
                // console.log(response);
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
            //toast.error("Ocurrió un error inesperado "+ error.response.data.error);
            toast.error("problema de conexión detectado");
        });

    }, [navigate, token])

    useEffect(() => {
        getReservations()
    }, [auth.id, getReservations, navigate, token]);


    const deleteUser = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.delete(`reservations/delete/${id}`, config).then((response) => {
            // console.log(response);
            if (response.status === 200) {
                console.log(response);
                toast.error("se canceló la reservación");
                getReservations()
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate("/login");
            }
            if (error.response.status === 403) {
                navigate("/");
            }
            console.log(error)
            //toast.error("Ocurrió un error inesperado "+ error.response.data.error);
            toast.error("problema de conexión detectado");
        });
    }

    const updateStateReserved = (e, id) => {
        const { value } = e.target
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        };
        const body = { estadoReserva: value }
        axios.put(`reservations/edit/${id}`, body, config).then((response) => {
            // console.log(response);
            if (response.status === 200) {
                console.log(response);
                toast.error("se actualizó el estado de la reservación");
                getReservations()
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate("/login");
            }
            if (error.response.status === 403) {
                navigate("/");
            }
            console.log(error)
            //toast.error("Ocurrió un error inesperado "+ error.response.data.error);
            toast.error("problema de conexión detectado");
        });
    }

    const updateStatePay = (e, id) => {
        const { value } = e.target
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        };
        const body = { estadoPago: value }
        axios.put(`reservations/edit/${id}`, body, config).then((response) => {
            // console.log(response);
            if (response.status === 200) {
                console.log(response);
                toast.error("se actualizó el estado del pago");
                getReservations()
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate("/login");
            }
            if (error.response.status === 403) {
                navigate("/");
            }
            console.log(error)
            //toast.error("Ocurrió un error inesperado "+ error.response.data.error);
            toast.error("problema de conexión detectado");
        });
    }

    return (
        <>
            <header className="site-header m-0 p-0">
                <NavDashBoard />
            </header>
            <div className="container">
                <ToastContainer theme="light" position="bottom-right" />
                {Reservations ? <TblAdmReservations reservations={Reservations} deleteUser={deleteUser} getReservations={getReservations} updateStateReserved={updateStateReserved} updateStatePay={updateStatePay} /> : null}
            </div>
        </>
    )
}

export default AdmReservations