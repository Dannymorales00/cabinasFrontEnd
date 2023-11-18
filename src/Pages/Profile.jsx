import { useContext, useState, useEffect, useCallback } from 'react';
import AuthContext from '../context/AuthContext';
import axios from './../Axios/configAxios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Nav';
import NewPassword from '../components/NewPassword';
import Loading from '../components/Loading';
import UserEditModal from './../components/ModalEditUser';


const ProfilePage = () => {
    const { auth, token } = useContext(AuthContext);
    const [IsLoading, setIsLoading] = useState(false);
    const [UserLogged, setUserLogged] = useState(null);
    const [ShowNewPass, setShowNewPass] = useState(false);
    const navigate = useNavigate();


    const getUser = useCallback(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Ejemplo: 'Bearer tu-token-jwt'
            },
        };
        axios.get(`users/${auth.id}`, config).then((response) => {
            // console.log(response);
            if (response.status === 200) {
                setUserLogged(response.data)
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
    }, [auth.id, navigate, token])

    useEffect(() => {
        if (auth) {
            getUser()
        }
    }, [auth, getUser, navigate, token])

    const handleChangePassword = (UserLogged) => {
        setIsLoading(true)
        if (auth.correo) {
            const data = {
                correo: auth.correo
            }
            // console.log(data)
            axios.post('users/forgotPassword', data)
                .then(res => {

                    if (res.status === 200) {

                        toast.info(res.data.msg);
                        setShowNewPass(true)

                    }
                })
                .catch(error => {
                    //error end point
                    if (error.response.status === 404) {
                        return toast.info(error.response.data.msg);
                    }
                    //error de esquemas de validacion
                    if (error.response.status === 400) {
                        return toast.info(error.response.data.msg[0].msg);
                    }
                    // console.log(error)
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            toast.info('debe ingresar un correo electronico')
        }

    }

    const hideMenuPass = () => {
        setShowNewPass(false)
    }


    return (
        <div>

            <header className="site-header m-0 p-0">
                <Nav />

            </header>
            <ToastContainer theme="light" position="bottom-right" />
            {IsLoading ? <Loading loading={IsLoading}></Loading>
                :
                <section className=" gradient-custom-2 mt-5">
                    <div className="container-fluid py-4">
                        {!ShowNewPass &&
                            <div className="row d-flex justify-content-center align-items-center mt-5">
                                <div className="col col-lg-9 col-xl-7">
                                    <div className="card border">
                                        <div className="card-header h5" data-aos="fade-out" data-aos-delay={150}>Perfil</div>
                                        <div data-aos="fade-out" data-aos-delay={150} className="rounded-top text-white d-flex flex-row bg-secondary" style={{ maxHeight: 120, backgroundImage: "url('img/fondoperfil.jpg')" }}>
                                            <div className="ms-1 ms-sm-5 mt-1 d-flex flex-column text-center" style={{ width: 100 }}>
                                                <span className="mt-5 fa fa-user fa-5x fa-fade" />
                                            </div>
                                            <div className="ms-2 mt-4">

                                                {UserLogged &&
                                                    <p style={{ marginTop: '55%' }}> {UserLogged.nombre}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="" style={{ backgroundColor: '#f8f9fa' }}>
                                                <div className="row m-0  py-2  justify-content-end">
                                                    <div className="col col-12 col-sm-5 col-md-5 col-lg-5 col-xxl-4 col-xxl-3 text-center mt-2 ">
                                                        {UserLogged ?
                                                            <UserEditModal value={'Editar cuenta'} styles={'btn btn-secondary btn-sm'} user={UserLogged} handleRefresh={getUser} />
                                                            : null
                                                        }
                                                    </div>
                                                    <div className="col col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-3 text-center mt-2 ">

                                                        {UserLogged ?
                                                            <button data-aos="fade-out" data-aos-delay={150} className="btn btn-secondary btn-sm" style={{minWidth:200}} onClick={() => handleChangePassword(UserLogged)}>Cambiar Contraseña</button>
                                                            : null
                                                        }

                                                    </div>
                                                </div>
                             
                                        </div>
                                        <div className="card-body p-4 text-black" data-aos="fade-out" data-aos-delay={150}>
                                            <div className="mb-5">
                                                <p className="lead fw-normal mb-1">Información de la cuenta</p>
                                                <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                    {UserLogged &&
                                                        <>

                                                            <p className="font-italic mb-1">Cédula: {UserLogged.cedula}</p>
                                                            <p className="font-italic mb-1">Nombre: {UserLogged.nombre}</p>
                                                            <p className="font-italic mb-1">Correo: {UserLogged.correo}</p>
                                                            <p className="font-italic mb-1">Teléfono: {UserLogged.telefono}</p>
                                                            <p className="font-italic mb-1">Tipo: {UserLogged.tipo}</p>
                                                            <p className="font-italic mb-1">Estado: {UserLogged.estado}</p>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="lead fw-normal mb-0"></p>
                                    
                                            </div>

                                            <div className="row g-2">
                                                <div className="col">
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        {ShowNewPass &&
                            <NewPassword correo={auth.correo} handle={hideMenuPass} />
                        }

                    </div>

                </section>

            }


        </div>
    );
};


export default ProfilePage;
