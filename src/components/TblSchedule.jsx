const TblSchedule = ({ schedules }) => {
    const convert24to12Hours = (hora24) => {
        // Parsea la hora en un objeto Date
        const fecha = new Date(`2000-01-01T${hora24}`);
        // Obtiene las horas y minutos en formato de 12 horas con AM/PM
        const hora12 = fecha.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return hora12;
    }

    return (
        <>
            <p><span className="d-block">Horarios:</span></p>

                <table>
                    <thead>
                        <tr className=" p-0 m-0">
                            <th style={{ width: 80 }}></th>
                            <th style={{ maxHeight: 40, color: "gray" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.id} className=" p-0 m-0" style={{ height: 5 }}>
                                <td className="fs-6 m-0 p-0" style={{ color: "gray" }}>{schedule.dia}</td>
                                <td className="fs-6 m-0 p-0" style={{ color: "gray" }}>
                                {schedule.estado ===0 ? "Cerrado"
                                :
                                    convert24to12Hours(schedule.horaApertura) + convert24to12Hours(schedule.horaCierre)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    
        </>
    );
};

export default TblSchedule;
