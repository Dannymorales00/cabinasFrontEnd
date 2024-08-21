import { useEffect, useState, useContext, useCallback } from 'react'
import NavDashBoard from './../components/NavDashBoard';
import axios from './../Axios/configAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TblRooms from '../components/TblRooms';

const AdmCabinas = () => {

  const [Rooms, setRooms] = useState(null);
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();


  const getRooms = useCallback(() =>{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get('rooms/adm', config).then((response) => {
      // console.log(response);
      if (response.status === 200) {
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
      //toast.error("Ocurrió un error inesperado "+ error.response.data.error);
      toast.error("problema de conexión detectado");
    });


  },[navigate, token]);

  useEffect(() => {
    if (!Rooms) {
      getRooms();
    }
     

  }, [Rooms, getRooms, navigate, token]);

  return (
    <>
      <NavDashBoard />
      <div className="container">
        <ToastContainer theme="light" position="bottom-right" />
        {Rooms ? <TblRooms rooms={Rooms} getRooms={getRooms}  />:null}
      </div>
    </>
  )
}

export default AdmCabinas