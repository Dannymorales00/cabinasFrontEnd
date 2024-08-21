import RoomDetailsModal from './ModalDetailsRoom';
import { useState, useContext } from 'react';
import ReactPaginate from 'react-paginate'; // Importa ReactPaginate
import AuthContext from './../context/AuthContext';
import axios from './../Axios/configAxios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TblRooms = ({ rooms, getRooms }) => {
    const [FilterEstado, setFilterEstado] = useState('Todos');
    const [FilterNumero, setFilterNumero] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const roomPerPage = 4;
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const filteredUsers = () => {
        if (rooms) {

            if (FilterEstado === 'Todos' && FilterNumero === '') {
                return rooms;
            }

            if (FilterEstado !== 'Todos' && FilterNumero !== '') {
                return rooms.filter((room) => (room.estado === FilterEstado) && (room.numero.toString().indexOf(FilterNumero) !== -1));
            }

            if (FilterEstado !== 'Todos') {
                return rooms.filter((room) => (room.estado === FilterEstado));
            }

            if (FilterNumero !== '') {
                return rooms.filter((room) => {
                    return room.numero.toString().indexOf(FilterNumero) !== -1;
                });
            }
        }
        return [];
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected); // Actualiza el número de página actual
    };


    const offset = currentPage * roomPerPage;
    const currentRooms = filteredUsers().slice(offset, offset + roomPerPage);

    const deleteRoom = (id) => {
        console.log(id);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.delete(`rooms/delete/${id}`, config).then((response) => {
            if (response.status === 200) {
                toast.error("se eliminó correctamente");
                getRooms()
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
            <div >
  
                <p className='mt-3 mt-sm-5 fs-5' data-aos="fade-out" data-aos-delay={150}>Administración de habitaciones</p>
                <div className="row mb-0 mb-sm-3 py-2 py-sm-2 " data-aos="fade-out" data-aos-delay={150}>

                    <div className='col col-6 col-sm-4 col-lg-2' >
                        <label htmlFor="filterSelect" className="form-label mb-0">Filtrar por estado:</label>
                        <select id="filterSelect" className="form-select"
                            defaultValue={FilterEstado} onChange={(e) => setFilterEstado(e.target.value)}
                            style={{ width: '140px', height: 35 }}>
                            <option value="Todos">Todos</option>
                            <option value="Activo">Activos</option>
                            <option value="Inactivo">Inactivos</option>
                        </select>
                    </div>
                    <div className='col col-6 col-sm-4  col-lg-2' >
                        <label htmlFor="filterId" className="form-label mb-0">Filtrar por numero:</label>
                        <input
                            className="form-control"
                            id='filterId'
                            type="text"
                            defaultValue={FilterNumero}
                            maxLength={12}
                            style={{ width: '140px', height: 35 }}
                            onChange={e => {
                                setFilterNumero(e.target.value.replace(/[^\d]/ig, ""));
                            }}
                        />
                    </div>
                    <div className='col col-12 col-sm-4 col-lg-8 text-end p-2 pe-3'>
                        <a className='btn btn-success mt-2' href={'/newRoom'}
                            id='btn'
                            style={{ width: '140px' }}
                        >Agregar</a>
                    </div>

                </div>
                <div className="table-responsive">
                    <div style={{ height: 300 }} >
                        <table className="table table-bordered table-striped">
                            <thead data-aos="fade-out" data-aos-delay={150}>
                                <tr>
                                    <th>Número</th>
                                    <th>Descripción</th>
                                    <th>Capacidad</th>
                                    <th>Estado</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms && currentRooms.map((room) => (
                                    <tr key={room.id}>
                                        <td data-aos="fade-out" data-aos-delay={150}>{room.numero}</td>
                                        <td data-aos="fade-out" data-aos-delay={150}>{room.descripcion}</td>
                                        <td data-aos="fade-out" data-aos-delay={150}>{room.capacidad}</td>
                                        <td data-aos="fade-out" data-aos-delay={150}>{room.estado}</td>
                                        <td data-aos="fade-out" data-aos-delay={150}>{room.precio}</td>
                                        <td data-aos="fade-out" data-aos-delay={150}>{room.porcentajeDescuento}</td>
                                        <td>
                                            <RoomDetailsModal room={room}></RoomDetailsModal>
                                        </td>
                                        <td data-aos="fade-out" data-aos-delay={150}>
                                            <a className="btn btn-primary btn-sm" href={`/editRoom/${room.id}`}><span className="fa fa-edit fa-fade" /></a>
                                        </td>
                                        <td data-aos="fade-out" data-aos-delay={150}>
                                            <button className="btn btn-danger btn-sm" id={room.id} onClick={() => deleteRoom(room.id)}><span className="fa fa-trash" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {rooms &&
                    <div className='my-1 table-responsive' data-aos="fade-out" data-aos-delay={150}>
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={1}
                            marginPagesDisplayed={1}
                            pageCount={Math.ceil(rooms.length / roomPerPage)}
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
            </div>
        </>);
};

export default TblRooms;
