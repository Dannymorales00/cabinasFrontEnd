import FormatDate from './FormatDate';
const RoomDetailsModal = ({ reservation }) => {
    return (
        <>
            <button data-aos="fade-out" data-aos-delay={150} type="button" className="btn btn-success btn-sm"
                data-bs-toggle="modal" data-bs-target={"#exampleModal" + reservation.id}
                style={{ height: 40 }}>
                <span className="fa fa-eye fa-fade" />
            </button>
            <div className="modal fade" id={"exampleModal" + reservation.id} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger">
                            <h5 className="modal-title text-white">Detalles de la Reservación</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {reservation && (
                                <div>
                                    <h5 className="card-title mt-3 mb-0">Datos de la Habitación</h5>
                                    <div className=" mb-0 border-top border-3">
                                        <p className="mb-0">Número de Habitación: {reservation.numeroHabitacion}</p>
                                        <p className="mb-0">Cantidad de Huéspedes: {reservation.cantidadHuespedes}</p>
                                        <p className="mb-0">Reserva Desde: {FormatDate(reservation.fechaReservaDesde)}</p>
                                        <p className="mb-0">Reserva Hasta: {FormatDate(reservation.fechaReservaHasta)}</p>
                                        <p className="mb-0">Estado de Reserva: {reservation.estadoReserva}</p>
                                        <p className="mb-0">Monto de Reserva: {reservation.montoReserva}</p>
                                        <p className="mb-0">Monto Total: {reservation.montoTotal}</p>
                                        <p className="mb-0">Método de Pago: {reservation.metodoPago}</p>
                                        <p className="mb-0">Id Paypal: {reservation.idPaypalPago}</p>
                                        <p className="mb-0">Estado de Pago: {reservation.estadoPago}</p>
                                        <p className="mb-0">Descuento: {reservation.porcentajeDescuento}%</p>
                                        <p className="mb-0">Fecha de Solicitud: {FormatDate(reservation.createdAt)}</p>
                                    </div>
                                    <h5 className="card-title mt-3 mb-0">Datos del cliente</h5>
                                    <div className=" mb-0 border-top border-3">

                                        <p className="mb-0 mt-2">Cédula: {reservation.idUsuario.cedula}</p>
                                        <p className="mb-0">Nombre: {reservation.idUsuario.nombre}</p>
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
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default RoomDetailsModal;
