import { useContext } from 'react'
import AuthContext from '../context/AuthContext';
// import Spinner from 'react-spinner-material';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = ({ children, roles }) => {
  const { auth, loading } = useContext(AuthContext)
  //console.log(loading)
  if ((!loading)) {
    if (auth) {
      if (roles.includes(auth.tipo)) {
        return children;
      }else{return <Navigate replace to="/" /> }
      
    }else{return <Navigate replace to="/login" /> }
  }
  //console.log('cargando...')
  // return <Spinner style={{ margin: "auto" }} size={120} visible={true} color="Red" />
  return <Loading loading={true}></Loading>
}

export default PrivateRoute;