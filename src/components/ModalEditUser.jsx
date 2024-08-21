import { useState, useContext } from 'react';
import axios from './../Axios/configAxios';
import AuthContext from './../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserEditModal = ({ value, styles, user, handleRefresh }) => {
    const { token, auth } = useContext(AuthContext)
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        // onSave(editedUser);+
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Ejemplo: 'Bearer tu-token-jwt'
            }
        };
        axios.put(`users/edit/${user.id}`, editedUser, config)
            .then(res => {
                if (res.status === 200) {
                    toast.info('estado actualizado correctamente');
                    document.getElementById(`editModal${user.id}`).click();
                    handleRefresh();
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    toast.error(error.response.data.msg[0].msg);
                }
                if (error.response.status === 404 | error.response.status === 401) {
                    toast.error(error.response.data.msg);
                }
                //  console.log(error);
            })
    };

    return (
        <>
            <button data-aos="fade-out" data-aos-delay={150} type="button" className={styles ? styles : 'btn btn-primary btn-sm'} style={styles ? { minWidth: 200 } : null} data-bs-toggle="modal" data-bs-target={"#editModal" + user.id}>
                <span className="fa fa-pencil fa-fade" /> {value ? value : null}
            </button>
            <div className="modal fade" id={"editModal" + user.id} aria-labelledby={"editModal" + user.id} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content text-start">
                        <div className="modal-header bg-danger">
                            <h5 className="modal-title text-white">Editar Usuario</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {editedUser && (
                                <div>
                                    <div className="mb-1 border-top border-3 mt-1">
                                        <div className="row mb-2">
                                            <div className="mb-3">
                                                <label className="form-label mb-0" style={{ textAlign: 'left' }}>Cédula</label>
                                                <input
                                                    type="text"
                                                    name="cedula"
                                                    value={editedUser.cedula}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    disabled={true}
                                                    style={{ height: 40, width: 150 }}
                                                />
                                            </div>

                                            <div className="mb-3">
                                            <label className="form-label mb-0">Teléfono</label>
                                            <input
                                                type="text"
                                                name="telefono"
                                                value={editedUser.telefono}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                style={{ height: 40, width: 150 }}
                                                maxLength={10}
                                                required
                                            />
                                        </div>

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label mb-0">Nombre</label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={editedUser.nombre}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                style={{ height: 40 }}
                                                maxLength={50}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-0">Correo</label>
                                            <input
                                                type="email"
                                                name="correo"
                                                value={editedUser.correo}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                style={{ height: 40 }}
                                                maxLength={50}
                                                required
                                            />
                                        </div>
                                

                                        <div className="mb-3">
                                            <label className="form-label mb-0">Tipo</label>
                                            <select
                                                name="tipo"
                                                value={editedUser.tipo}
                                                onChange={handleInputChange}
                                                className="form-select"
                                                style={{ height: 40, width: 150 }}
                                            >

                                                {auth && auth.tipo === "Administrador" ?
                                                    <>
                                                        <option value="Administrador">Administrador</option>
                                                        <option value="Cliente">Cliente</option>
                                                    </>
                                                    :
                                                    <option value="Cliente">Cliente</option>
                                                }

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserEditModal;
