const RoomDetailsModal = ({ room }) => {
    return (
        <>

            <button data-aos="fade-out" data-aos-delay={150} type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target={"#exampleModal" + room.id}>
                <span className="fa fa-eye fa-fade" />
            </button>
            {/* Modal de Detalles */}
            <div className="modal fade" id={"exampleModal" + room.id} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Detalles de la Habitación</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                     
                                <div id={"carouselExampleFade" + room.id} className="carousel slide carousel-fade" data-bs-interval="3000" data-bs-ride="carousel">
                                    <div className="carousel-inner text-center" >

                                        {room.imagenes&&
                                            room.imagenes.map((img, index) => index === 0 ? <div key={index} className="carousel-item active">
                                                <img src={img.url} className="d-block w-100 img-fluid" alt="..." style={{ maxHeight: 300, minHeight: 200 }} />
                                            </div> :
                                                <div key={index} className="carousel-item">
                                                    <img src={img.url} className="d-block w-100 img-fluid" alt="..." style={{ maxHeight: 300, minHeight: 200 }} />
                                                </div>
                                            )
                                        }

                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleFade" + room.id} data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleFade" + room.id} data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                      



                            {room && (
                                <div>
                                    <p>ID: {room.id}</p>
                                    <p>Número: {room.numero}</p>
                                    <p>Descripción: {room.descripcion}</p>
                                    <p>Creada: {room.createdAt}</p>
                                    <p>Actualizada:{room.updatedAt}</p>
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
