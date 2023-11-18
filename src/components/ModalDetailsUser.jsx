import FormatDate from './FormatDate';
const UserDetailsModal = ({ user }) => {
    return (
        <div>
            <button type="button" data-aos="fade-in" data-aos-delay={150} className="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target={"#exampleModal" + user.id}>
                <span className="fa fa-eye fa-fade text-light" />
            </button>
            <div className="modal fade" id={"exampleModal" + user.id} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger">
                            <h5 className="modal-title text-white">Detalles del Usuario</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {user && (
                                <>
                                    <div className=" mb-1 border-top border-3 mt-1">
                                        <p className="mb-0 mt-3">Cédula: {user.cedula}</p>
                                        <p className="mb-0">Nombre: {user.nombre}</p>
                                        <p className="mb-0">Correo: {user.correo}</p>
                                        <p className="mb-0">Telefono: {user.telefono}</p>
                                        <p className="mb-0">Tipo: {user.tipo}</p>
                                        <p className="mb-0">Estado: {user.estado}</p>
                                        <p className="mb-0">Fecha de creación: {FormatDate(user.createdAt)}</p>
                                        <p className="mb-0">Fecha de actualización: {FormatDate(user.updatedAt)}</p>
                                    </div>
                                </>
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
        </div>
    );
};

export default UserDetailsModal;
