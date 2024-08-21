import { useState, useContext, useEffect } from 'react'
import axios from '../Axios/configAxios'
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Spinner from 'react-spinner-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const { auth, handleAuth } = useContext(AuthContext);
    const [Loading, setLoading] = useState(false);
    const { values, handleInputChange } = useForm(
        {
            cedula: '',
            password: ''
        }
    )
    const { cedula, password } = values;
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica el estado auth al cargar el componente
        if (auth) {
            navigate("/dashboard");
        }
    }, [auth, navigate]);

    const ComprobarUsuario = (e) => {
        e.preventDefault();
        obtenerUsuario()
    }
    const obtenerUsuario = () => {
        setLoading(true)
        const data = {
            cedula,
            contrasena: password
        }
        axios.post('users/login', data)
            .then(res => {
                const token = res.data;
                handleAuth(token);
                navigate("/dashboard");
            })
            .catch(error => {
                if (error.response.status === 400) {
                    toast.error(error.response.data.msg[0].msg);
                }

                if (error.response.status === 404) {
                    toast.error(error.response.data.msg);
                }
                // console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleGoBack = () => {
        navigate("/");
    }

    const handleRegister = () => { navigate("/register"); }
    const handleResetPassword = () => { navigate("/forgotPassword"); }
    return (
        <>
            <ToastContainer theme="light" position="bottom-right" />
            <div className="container "  data-aos="fade-in" data-aos-delay={150} style={{ marginTop: '5%' }}>

                <div className="row justify-content-center">
                    <div className="col col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4  align-self-center">
                        <div className="mb-3 mt-4">
                            <button type="button" id="btnGoBack" onClick={() => { handleGoBack() }} className="btn btn-secondary">
                                <span className="fa fa-arrow-left" />
                            </button>
                        </div>
                        <form onSubmit={(e) => { ComprobarUsuario(e) }} className="card text-dark border border-danger">
                            <div className="card" >
                                <div className="card-header h5 text-white bg-danger text-center pt-3" style={{minHeight:45}}>CABINAS GUANACASTE</div>
                                <div className="card-body px-3 px-sm-5">
                                    <div onKeyDown={(e) => e.key === 'Enter' && ComprobarUsuario(e)}>
                                        <div className="text-center my-4">
                                            <div className="fs-5">Ingresar</div>
                                        </div>
                                        <div className="form-outline  mb-3 mt-5">
                                            <div className="input-group ">
                                                <span className="input-group-text"><span className="fa fa-id-card fa-fade" /></span>
                                                <input type="text"
                                                    id="TxtCedula"
                                                    value={cedula}
                                                    onChange={handleInputChange}
                                                    name="cedula"
                                                    className=" form-control"
                                                    maxLength={12}
                                                    required
                                                    style={{ maxHeight: 40 }} />
                                            </div>
                                        </div>
                                        <div className="form-outline mt-4 mb-5">
                                            <div className="input-group ">
                                                <span className="input-group-text"><span className="fa fa-lock fa-fade" /></span>
                                                <input type="password"
                                                    value={password}
                                                    onChange={handleInputChange}
                                                    id="TxtPassword"
                                                    name="password"
                                                    className=" form-control"
                                                    maxLength={30}
                                                    required
                                                    style={{ maxHeight: 40 }} />
                                            </div>
                                        </div>
                                        <div className="text-center my-3">
                                            <span className="nav-link fw-bold p-0" style={{ cursor: "pointer" }} onClick={() => { handleResetPassword() }}> olvidó su contraseña?</span>
                                            <span className="nav-link fw-bold p-0" style={{ cursor: "pointer" }} onClick={() => { handleRegister() }}> Registrarme</span>
                                        </div>



                                        <div className="text-center my-2">
                                            {!Loading ?
                                                <>
                                                    <button tabIndex={1} className="btn btn-secondary" type="submit"> <span className="fa fa-bed fa-fade" /> Ingresar </button>
                                                </>
                                                : <Spinner style={{ margin: "auto" }} visible={Loading} color="Red" />}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Login