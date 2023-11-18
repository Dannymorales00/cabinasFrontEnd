
const TblShedules = ({ horarios, handleInputChangeShedules, handleSwitchChange }) => {
    return (
        <div className="container">

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Día</th>
                            <th>Hora de Apertura</th>
                            <th>Hora de Cierre</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {horarios.map((horario, index) => (
                            <tr key={horario.id}>
                                <td>
                                    <input
                                        type="text"
                                        name={"dia"}
                                        defaultValue={horario.dia}
                                        className="form-control"
                                        readOnly
                                        required
                                        style={{ maxHeight: 40, minWidth: 100 }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        name={"horaApertura"}
                              
                                        defaultValue={horario.horaApertura}
                                        className="form-control"
                                        required
                                        onChange={(e) => handleInputChangeShedules(e,index)}
                                        style={{ maxHeight: 40 }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        name={"horaCierre"}
                                
                                        defaultValue={horario.horaCierre}
                                        className="form-control"
                                        required
                                        onChange={(e) => handleInputChangeShedules(e,index)}
                                        style={{ maxHeight: 40 }}
                                    />
                                </td>
                                <td>
                                    <div className="form-check form-switch" style={{ minWidth: 110 }}>
                                        <input
                                            type="checkbox"
                                            name={"estado"}
                                    
                                            defaultChecked={horario.estado === 1}
                                            onChange={(e) => handleSwitchChange(e,index)}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">
                                            {horario.estado === 1 ? 'Abierto' : 'Cerrado'}
                                        </label>
                                    </div>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TblShedules;