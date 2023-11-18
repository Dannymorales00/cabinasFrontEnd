import { useEffect, useState, useContext, useCallback } from 'react'
// import Section from './../components/Section';
import Nav from './../components/Nav';
import axios from './../Axios/configAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TblReservations from '../components/TblReservations';


const MyReservations = () => {


  const [Reservations, setRerservations] = useState(null);
  const { token, auth } = useContext(AuthContext)
  const navigate = useNavigate();


  const getReservations = useCallback(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Ejemplo: 'Bearer tu-token-jwt'
      },
    };

    axios.get(`reservations/user/${auth.id}`, config).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        // console.log(response);
        setRerservations(response.data)
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


  }, [auth.id, navigate, token]);

  useEffect(() => {
    getReservations()


  }, [auth.id, getReservations, navigate]);



  const cancelReservation = (id) => {
    console.log(id);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Ejemplo: 'Bearer tu-token-jwt'
      },
    };

    axios.delete(`reservations/delete/${id}`, config).then((response) => {
      if (response.status === 200) {
        console.log(response);
        toast.error("se cancelo la reservación");
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
      <Nav />
      <div className="container">

        <ToastContainer theme="light" position="bottom-right" />
        <TblReservations reservations={Reservations} cancelReservation={cancelReservation} />



        {/* <Section></Section> */}

      </div>


    </>
  )
}

export default MyReservations