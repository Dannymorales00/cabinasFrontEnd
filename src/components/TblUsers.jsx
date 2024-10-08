import React, { useState, useContext } from 'react';
import UserDetailsModal from './ModalDetailsUser';
import UserEditModal from './ModalEditUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from './../Axios/configAxios';
import Loading from './Loading';
import AuthContext from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const TblUsers = ({ users, getUsers }) => {
    const { token } = useContext(AuthContext);
    const [IsLoading, setIsLoading] = useState(false);
    const [FilterEstado, setFilterEstado] = useState('Todos');
    const [FilterCedula, setFilterCedula] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();
    const usersPerPage = 4; // Número de usuarios por página+


    const filteredUsers = () => {
        if (users) {

            if (FilterEstado === 'Todos' && FilterCedula === '') {
                return users;
            }

            if (FilterEstado !== 'Todos' && FilterCedula !== '') {
                return users.filter((user) => (user.estado === FilterEstado) && (user.cedula.toString().indexOf(FilterCedula) !== -1));
            }

            if (FilterEstado !== 'Todos') {
                return users.filter((user) => (user.estado === FilterEstado));
            }

            if (FilterCedula !== '') {
                return users.filter((user) => {
                    return user.cedula.toString().indexOf(FilterCedula) !== -1;
                });
            }
        }
        return [];
    };

    const handleSwitchChange = (e, userId) => {
        const newState = e.target.checked ? 'Activo' : 'Inactivo';
        setIsLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Ejemplo: 'Bearer tu-token-jwt'
            }
        };
        axios.put(`users/edit/${userId}`, { estado: newState }, config)
            .then(res => {
                if (res.status === 200) {
                    toast.info('estado actualizado correctamente');
                    getUsers();
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
            .finally(() => {
                setIsLoading(false)
            })
    };

    const handleRefresh = () => {
        getUsers();
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected); // Actualiza el número de página actual
    };

    const offset = currentPage * usersPerPage;
    const currentUsers = filteredUsers().slice(offset, offset + usersPerPage);

    const deleteUser = (id) => {
        console.log(id);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.delete(`users/delete/${id}`, config).then((response) => {
            if (response.status === 200) {
                toast.error("se eliminó correctamente");
                getUsers()
            }
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate("/login");
            }
            if (error.response.status === 400) {
                toast.error(error.response.data.msg[0].msg);
            }
            if (error.response.status === 404) {
                toast.error(error.response.data.msg);
            }
            // console.log(error)
        });
    }

    return (
        <>
            {IsLoading ? (
                <Loading loading={IsLoading} />
            ) : (

                <div style={{ marginTop: '110px' }}>
                    <p className='mt-2 mt-sm-5 fs-5' data-aos="fade-out" data-aos-delay={150}>Administración de usuarios</p>

                    <div className="row mb-3 py-2 " data-aos="fade-out" data-aos-delay={150}>
                        <div style={{ width: 170 }}>
                            <label htmlFor="filterSelect" className="form-label mb-0">Filtrar por estado:</label>
                            <select id="filterSelect" className="form-select" value={FilterEstado} onChange={(e) => setFilterEstado(e.target.value)} style={{ width: '140px', height: 35 }}>
                                <option value="Todos">Todos</option>
                                <option value="Activo">Activos</option>
                                <option value="Inactivo">Inactivos</option>
                            </select>
                        </div>
                        <div style={{ width: 170 }}>
                            <label htmlFor="filterId" className="form-label mb-0">Filtrar por cédula:</label>
                            <input
                                className="form-control"
                                id='filterId'
                                type="text"
                                value={FilterCedula}
                                maxLength={12}
                                style={{ width: '140px', height: 35 }}
                                onChange={e => {
                                    setFilterCedula(e.target.value.replace(/[^\d]/ig, ""));
                                }}
                            />
                        </div>

                    </div>

                    <div className="table-responsive" >
                        <div style={{ height: 300 }} >
                            <table className="table table-bordered table-striped" >
                                <thead data-aos="fade-out" data-aos-delay={150} >
                                    <tr>
                                        <th>Cedula</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Telefono</th>
                                        <th>Tipo</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {users && currentUsers.map((user) => (
                                        <tr key={user.id} >
                                            <td data-aos="fade-out" data-aos-delay={150}>{user.cedula}</td>
                                            <td data-aos="fade-out" data-aos-delay={150}>{user.nombre}</td>
                                            <td data-aos="fade-out" data-aos-delay={150}>{user.correo}</td>
                                            <td data-aos="fade-out" data-aos-delay={150}>{user.telefono}</td>

                                            <td data-aos="fade-out" data-aos-delay={150}>{user.tipo}</td>
                                            <td data-aos="fade-out" data-aos-delay={150}>
                                                <div data-aos="fade-out" data-aos-delay={150} className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`flexSwitchCheck${user.id}`}
                                                        checked={user.estado === "Activo"}
                                                        onChange={(e) => handleSwitchChange(e, user.id)}
                                                        disabled={user.tipo === 'Administrador'}
                                                    />
                                                    <label className="form-check-label" htmlFor={`flexSwitchCheck${user.id}`}>
                                                        {user.estado === "Activo" ? 'Activo' : 'Inactivo'}
                                                    </label>
                                                </div>
                                            </td>
                                            <td >
                                                {user ? <UserDetailsModal user={user} /> : null}
                                            </td>

                                            <td>
                                                {user ? <UserEditModal user={user} handleRefresh={handleRefresh} /> : null}
                                            </td>
                                            <td data-aos="fade-in" data-aos-delay={150}>
                                                <button id={user.id} onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm"><span className="fa fa-trash fa-fade" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {users &&

                        <div className='my-1' data-aos="fade-out" data-aos-delay={150}>
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageChange}
                                pageRangeDisplayed={1}
                                marginPagesDisplayed={1}
                                pageCount={Math.ceil(users.length / usersPerPage)}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}

                            />
                        </div>

                    }
                </div>)}
        </>
    )
};
export default TblUsers;
