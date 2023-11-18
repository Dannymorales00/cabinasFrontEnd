import { useState } from 'react'; // Importa useState para manejar el estado del filtro
import FormatDate from './FormatDate';
import ReservationDetailsModal from './ModalDetailsReservation'
const TblReservations = ({ reservations, cancelReservation }) => {
    const [filter, setFilter] = useState('Todas'); // Inicializa el estado del filtro

    // Función para filtrar las reservas según la opción seleccionada
    const filteredReservations = () => {
        if (filter === 'Todas') {
            return reservations;
        } else {
            return reservations.filter((reservation) => reservation.estadoReserva === filter);
        }
    };

    return (
        <div className="table-responsive" >
            <h3 className='mt-5' data-aos="fade-out" data-aos-delay={150}>Mis Reservaciones</h3>

            {/* Dropdown para seleccionar el filtro */}
            <div className="mb-3 text-start" data-aos="fade-out" data-aos-delay={150}>
                <label htmlFor="filterSelect" className="form-label">Filtrar por estado:</label>
                <select id="filterSelect" className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '140px' }}>
                    <option value="Todas">Todas</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completada">Completada</option>
                </select>
            </div>

            <table className="table table-bordered table-striped">
                <thead data-aos="fade-out" data-aos-delay={150}>
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
                    {filteredReservations() && filteredReservations().map((reservation) => (
                        <tr key={reservation.id}>
                            <td data-aos="fade-out" data-aos-delay={150}>{reservation.numeroHabitacion}</td>
                            <td data-aos="fade-out" data-aos-delay={150}>{reservation.cantidadHuespedes}</td>
                            <td data-aos="fade-out" data-aos-delay={150}>{FormatDate(reservation.fechaReservaDesde)}</td>
                            <td data-aos="fade-out" data-aos-delay={150}>{FormatDate(reservation.fechaReservaHasta)}</td>
                            <td data-aos="fade-out" data-aos-delay={150}>{reservation.estadoReserva}</td>
                            <td data-aos="fade-out" data-aos-delay={150}>{reservation.estadoPago}</td>

                            <td>
                                <ReservationDetailsModal reservation={reservation} />
                            </td>

                            {(reservation.estadoReserva === 'Pendiente' | reservation.estadoReserva === 'Confirmada') ?
                                <>
                                    <td data-aos="fade-out" data-aos-delay={150}>
                                        <button id={reservation.id} onClick={(e) => cancelReservation(e.target.id)} className="btn btn-danger btn-sm"><span className="fa fa-ban fa-fade" /></button>
                                    </td>
                                </>
                                : <td> </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TblReservations;
