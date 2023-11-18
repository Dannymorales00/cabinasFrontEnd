import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../Axios/configAxios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewPassword = (props) => {
    const correo = props.correo;
    const handle = props.handle;

    const navigate = useNavigate();
    const [DataFrm, setDataFrm] = useState(
        {
            codigoRecuperacion: '',
            nuevaContrasena: '',
            confirmarContrasena: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(DataFrm);
        if (validateForm()) {
                const data = {
                    codigoRecuperacion: DataFrm['codigoRecuperacion'],
                    nuevaContrasena: DataFrm['nuevaContrasena'],
                    correo: correo
                }
                //console.log(data)
                axios.post('users/newPassword', data)
                    .then(res => {
                        console.log(res);
                        handleClear();
                        if (res.status === 200) {
                            toast.info(res.data.msg);
                            setTimeout(() => { navigate("/") }, 3000)
                        }
                    })
                    .catch(error => {
                        //error end point
                        if (error.response.status === 404) {
                            return toast.info(error.response.data.msg);
                        }
                        //error de esquemas de validacion
                        if (error.response.status === 400) {
                            return toast.info(error.response.data.details.error_message[0].msg);
                        }
                        console.log(error);
                    })
        }
    }

    const validateForm = () => {
        let error = false;

        if (!(DataFrm['codigoRecuperacion'] && DataFrm['nuevaContrasena'] && DataFrm['confirmarContrasena'])) {
            error   = true;
            toast.info('debe de completar todos los campos.')
        }
        if ((DataFrm['codigoRecuperacion'].length !== 6) ) {
            error   = true;
            toast.info('el codigo de recuperación deber tener 6 digitos.')
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordRegex.test(DataFrm.nuevaContrasena)) {
            error   = true;
            toast.info('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.')
        }
        if ((DataFrm['nuevaContrasena'] !== DataFrm['confirmarContrasena'])) {
            error   = true;
            toast.info('Las contraseñas no coinciden.')
        }
        return  !error;
    };

    const handleChange = (name, value) => { setDataFrm({ ...DataFrm, [name]: value }) }

    const handleClear = () => {
        document.getElementById('codigoRecuperacion').value = '';
        document.getElementById('nuevaContrasena').value = '';
        document.getElementById('confirmarContrasena').value = '';
        setDataFrm({
            codigoRecuperacion: '',
            nuevaContrasena: '',
            confirmarContrasena: '',
        })
    }

    const goBack = () => {
        handle();
    }

    return (
        <>

            <div className="container" style={{ marginTop: '3%' }}>
                <div className="row justify-content-center">
                    <div className="col col-12 col-sm-10 col-lg-5 col-xl-4  align-self-center" data-aos="fade-out" data-aos-delay={150}>
                        <div className="mb-4 mt-5 mt-sm-3">
                            <button type="button" id="btnGoBack" onClick={() => { goBack() }} className="btn btn-secondary">
                                <span className="fa fa-arrow-left" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} name="signupForm" id="signupForm">
                            <div className="card" >
                                <div className="card-header h5 text-white bg-danger text-center">Cambiar contraseña</div>
                                <div className="card-body px-5">



                                    <p className="card-text py-3" style={{ textAlign: 'left' }}>
                                        Ingresa el código enviado al correo electronico.
                                    </p>
                                    <div style={{ marginLeft: 'auto', marginRight: 'auto' }}></div>
                                    <div className="input-group mb-4">
                                        <span className="input-group-text"><span className="fa fa-key fa-fade" /></span>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="codigoRecuperacion"
                                            name="codigoRecuperacion"
                                            placeholder='código de recuperación'
                                            maxLength={10}
                                            required
                                            onChange={(e) => { handleChange('codigoRecuperacion', e.target.value) }}
                                            style={{ height: 40 }}
                                    
                                        />

                                    </div>
                    
                                    <div className="input-group mb-4">
                                        <span className="input-group-text"><span className="fa fa-unlock-alt fa-fade" /></span>

                                        <input
                                            type="password"
                                            className="form-control"
                                            id="nuevaContrasena"
                                            name="nuevaContrasena"
                                            placeholder='nueva contraseña'
                                            maxLength={30}
                                            required
                                            onChange={(e) => { handleChange('nuevaContrasena', e.target.value) }}
                                            style={{  height: 40 }}
                                        />
                                    </div>
                                    <div className="input-group mb-4">
                                        <span className="input-group-text"><span className="fa fa-unlock-alt fa-fade" /></span>

                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmarContrasena"
                                            name="confirmarContrasena"
                                            placeholder='confirmar contraseña'
                                            maxLength={30}
                                            required
                                            onChange={(e) => { handleChange('confirmarContrasena', e.target.value) }}
                                            style={{ height: 40 }}
                                        />
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button type="Submit" id="submitButton" className="btn btn-secondary">
                                        Establecer Contraseña
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

export default NewPassword