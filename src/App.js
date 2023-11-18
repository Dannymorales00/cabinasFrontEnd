import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { Routes, Route } from "react-router-dom";
import { useEffect,useContext  } from 'react';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';

//pages
import Login from './Pages/Login';
import AdmUsers from './Pages/AdmUsers';
import AdmCabinas from './Pages/AdmCabinas';
import AdmHome from './Pages/AdmHome';
import NewRoom from'./Pages/NewRoom';
import EditRoom from'./Pages/EditRoom';
import Rooms from './Pages/Rooms';
import RoomDetails from './Pages/RoomDetails';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import NewPassword from './components/NewPassword';
import MyReservations from './Pages/MyReservations';
import AdmReservations from './Pages/AdmReservations';

function App() {

  const {session, auth } = useContext(AuthContext)
  
  useEffect(() => {
    if (!auth) {
      session();
    }
  }, [auth, session]);


  return (

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/rooms" element={<Rooms />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/newPassword" element={<NewPassword />} />
        
        <Route exact path="/dashboard" element={<PrivateRoute roles={['Administrador']}> <Dashboard/> </PrivateRoute> } />
        <Route exact path="/myReservations" element={<PrivateRoute roles={['Administrador','Cliente']}> <MyReservations/> </PrivateRoute> } />
        <Route exact path="/RoomDetails/:id" element={<PrivateRoute roles={['Administrador','Cliente']}> <RoomDetails/> </PrivateRoute> } />
        <Route exact path="/profile" element={<PrivateRoute roles={['Administrador','Cliente']}> <Profile/> </PrivateRoute> } />
        <Route exact path="/admUsers" element={<PrivateRoute roles={['Administrador']}> <AdmUsers/> </PrivateRoute> } />
        <Route exact path="/admHome" element={<PrivateRoute roles={['Administrador']}> <AdmHome/> </PrivateRoute> } />
        <Route exact path="/admCabinas" element={<PrivateRoute roles={['Administrador']}> <AdmCabinas/> </PrivateRoute> } />
        <Route exact path="/admReservations" element={<PrivateRoute roles={['Administrador']}> <AdmReservations/> </PrivateRoute> } />
        <Route exact path="/newRoom" element={<PrivateRoute roles={['Administrador']}> <NewRoom/> </PrivateRoute> } />
        <Route exact path="/editRoom/:id" element={<PrivateRoute roles={['Administrador']}> <EditRoom/> </PrivateRoute> } />
        <Route exact path="/login" element={<Login />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>

  );
}

export default App;
