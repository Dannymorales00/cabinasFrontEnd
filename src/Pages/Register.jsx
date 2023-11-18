import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from './../Axios/configAxios';


const RegistroForm = () => {
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        telefono: '',
        correo: '',
        contrasena: '',
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!/^\d+$/.test(formData.cedula)) {
            newErrors.cedula = 'La cédula solo puede contener números.';
            toast.info('La cédula solo puede contener números.')
        }

        if (!/^\d+$/.test(formData.telefono)) {
            newErrors.telefono = 'El teléfono solo puede contener números.';
            toast.info('El teléfono solo puede contener números.')
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(formData.correo)) {
            newErrors.correo = 'Correo electrónico no válido.';
            toast.info('Correo electrónico no válido.')
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordRegex.test(formData.contrasena)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
            toast.info('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.')
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            registrarUsuario()
        }
    };

    const handleGoBack = () => {
        navigate("/login");
    }

    const registrarUsuario = () => {
        axios.post('users/', formData)
            .then(res => {
                if (res.status === 200) {
                    navigate("/login");
                }
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

            })
    }

    return (
        <>
            <ToastContainer theme="light" position="bottom-right" />
            <div className="container" style={{ marginTop: '3%' }}>
                <div className="row justify-content-center">
                    <div className="col col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5  align-self-center">
                        <div className="mb-3 mt-4">
                            <button type="button" id="btnGoBack" onClick={() => { handleGoBack() }} className="btn btn-secondary">
                                <span className="fa fa-arrow-left" />
                            </button>
                        </div>


                        <form onSubmit={handleSubmit} className="card text-dark border border-danger">
                            <div className="card" >
                                <div className="card-header h5 text-white bg-danger text-center">CABINAS GUANACASTE</div>
                                <div className="card-body px-3 px-sm-5">
                                    <div className="row mb-2">
                                        <div className="text-center my-4">
                                            <div className="fs-5">Registrarme</div>
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <div className="form-outline">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><span className="fa fa-id-card fa-fade" /></span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="cedula"
                                                        value={formData.cedula}
                                                        onChange={handleChange}
                                                        placeholder='identificación'
                                                        maxLength={12}
                                                        required
                                                        style={{ maxHeight: 40 }}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <div className="form-outline">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><span className="fa fa-phone fa-fade" /></span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="telefono"
                                                        value={formData.telefono}
                                                        onChange={handleChange}
                                                        placeholder='teléfono'
                                                        maxLength={12}
                                                        required
                                                        style={{ maxHeight: 40 }}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-2">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><span className="fa fa-user fa-fade" /></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder='nombre'
                                                maxLength={50}
                                                required
                                                style={{ maxHeight: 40 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-outline mb-2">
                                    <div className="input-group mb-3">
                                            <span className="input-group-text"><span className="fa fa-envelope fa-fade" /></span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            placeholder='correo electrónico'
                                            maxLength={50}
                                            required
                                            style={{ maxHeight: 40 }}
                                        />
                                        </div>
                                    </div>

                                    <div className="form-outline mb-2">
                                    <div className="input-group mb-3">
                                            <span className="input-group-text"><span className="fa fa-unlock-alt fa-fade" /></span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="contrasena"
                                            value={formData.contrasena}
                                            onChange={handleChange}
                                            placeholder='contraseña'
                                            maxLength={30}
                                            required
                                            style={{ maxHeight: 40 }}
                                        />
                                        </div>
                                    </div>

                                    <div className=" mb-4">

                                        <p className='text-center' style={{ fontSize: 11 }} >
                                            Al hacer clic en Registrarte, aceptas las Condiciones y las Políticas de privacidad.
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-secondary btn-block mb-2">Registrarse</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default RegistroForm;
