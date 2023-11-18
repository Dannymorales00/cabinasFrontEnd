import RoomDetailsModal from './ModalDetailsRoom';
import { useState } from 'react';
import ReactPaginate from 'react-paginate'; // Importa ReactPaginate


const TblRooms = ({ rooms }) => {
    const [FilterEstado, setFilterEstado] = useState('Todos');
    const [FilterNumero, setFilterNumero] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const roomPerPage = 4; // Número de usuarios por página+



    const filteredUsers = () => {
        if (rooms) {

            if (FilterEstado === 'Todos' && FilterNumero === '') {
                return rooms;
            }

            if (FilterEstado !== 'Todos' && FilterNumero !== '') {
                return rooms.filter((user) => (user.estado === FilterEstado) && (user.numero.toString().indexOf(FilterNumero) !== -1));
            }

            if (FilterEstado !== 'Todos') {
                return rooms.filter((user) => (user.estado === FilterEstado));
            }

            if (FilterNumero !== '') {
                return rooms.filter((user) => {
                    return user.numero.toString().indexOf(FilterNumero) !== -1;
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


    return (
        <>
            <div >
                <p className='mt-5 fs-5' data-aos="fade-out" data-aos-delay={150}>Administración de habitaciones</p>
                <div className="row mb-3 py-2 " data-aos="fade-out" data-aos-delay={150}>
                    <div style={{ width: 170 }}>
                        <label htmlFor="filterSelect" className="form-label mb-0">Filtrar por estado:</label>
                        <select id="filterSelect" className="form-select" defaultValue={FilterEstado} onChange={(e) => setFilterEstado(e.target.value)} style={{ width: '140px', height: 35 }}>
                            <option value="Todos">Todos</option>
                            <option value="Activo">Activos</option>
                            <option value="Inactivo">Inactivos</option>
                        </select>
                    </div>
                    <div style={{ width: 170 }}>
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
                    <div style={{ width: 170 }}>

                        <a className='btn btn-success' href={'/newRoom'}

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
                                            <button className="btn btn-danger btn-sm"><span className="fa fa-trash fa-fade" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {rooms &&

                    <div data-aos="fade-out" data-aos-delay={150}>
                        <ReactPaginate
                            previousLabel={"Anterior"}
                            nextLabel={"Siguiente"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(rooms.length / roomPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageChange}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            renderOnZeroPageCount={null}

                        />
                    </div>

                }
            </div>
        </>);
};

export default TblRooms;
