import { useState } from 'react';
import FormatDate from './FormatDate';
import ReservationDetailsModal from './ModalDetailsReservation'
import ReactPaginate from 'react-paginate'; 

const TbladmReservations = ({ reservations, updateStateReserved, updateStatePay }) => {
    const [filter, setFilter] = useState('Todas'); 
    const [currentPage, setCurrentPage] = useState(0);
    const reservationsPerPage = 4; // Número de usuarios por página

    const filteredReservations = () => {
        if (filter === 'Todas') {
            return reservations;
        } else {
            return reservations.filter((reservation) => reservation.estadoReserva === filter);
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected); // Actualiza el número de página actual
    };


    const offset = currentPage * reservationsPerPage;
    const currentReservations = filteredReservations().slice(offset, offset + reservationsPerPage);

    return (
        <>
            <div style={{ marginTop: '110px' }}>

                <p className='mt-2 mt-sm-5 fs-5'>Administración de Reservaciones</p>

                {/* Dropdown para seleccionar el filtro */}
                <div className="mb-3 text-start">
                    <label htmlFor="filterSelect" className="form-label">Filtrar por estado:</label>
                    <select id="filterSelect" className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '140px' }}>
                        <option value="Todas">Todas</option>
                        <option value="Confirmada">Confirmada</option>
                        <option value="Cancelada">Cancelada</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completada">Completada</option>
                    </select>
                </div>
                <div className="table-responsive mt-3">
                    <div style={{ height: 300 }} >
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Número</th>
                                    <th>Huespedes</th>
                                    <th>Reservada Desde</th>
                                    <th>Reservada Hasta</th>
                                    <th>Estado Reserva</th>
                                    <th>Estado Pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations && currentReservations.map((reservation) => (
                                    <tr key={reservation.id}>
                                        <td>{reservation.numeroHabitacion}</td>
                                        <td>{reservation.cantidadHuespedes}</td>
                                        <td>{FormatDate(reservation.fechaReservaDesde)}</td>
                                        <td>{FormatDate(reservation.fechaReservaHasta)}</td>
                                        <td>
                                            <select id="filterSelect" className="form-select"
                                                defaultValue={reservation.estadoReserva}
                                                style={{ width: '135px', height: 35 }}
                                                onChange={(e) => { updateStateReserved(e, reservation.id) }}>
                                                <option value="Confirmada">Confirmada</option>
                                                <option value="Cancelada">Cancelada</option>
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="Completada">Completada</option>
                                            </select>
                                            {/* {reservation.estadoReserva} */}
                                        </td>
                                        <td>
                                            <select id="filterSelect" className="form-select"
                                                defaultValue={reservation.estadoPago}
                                                style={{ width: '135px', height: 35 }}
                                                onChange={(e) => { updateStatePay(e, reservation.id) }}>
                                                <option value="Confirmado">Confirmado</option>
                                                <option value="Pendiente">Pendiente</option>
                                            </select>
                                            {/* {reservation.estadoPago} */}
                                        </td>

                                        <td>
                                            <ReservationDetailsModal reservation={reservation} />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {reservations &&

                    <div className='my-1' data-aos="fade-out" data-aos-delay={150}>
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={1}
                            marginPagesDisplayed={1}
                            pageCount={Math.ceil(reservations.length / reservationsPerPage)}
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
        </>
    );
};

export default TbladmReservations;
