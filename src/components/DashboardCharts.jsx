import { Chart } from 'react-google-charts';
import { useState, useEffect } from 'react';
import FormatDate from '../components/FormatDate';

const DashboardCharts = ({ reservations, rooms }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null)
  const habitacionesActivas = rooms.filter(room => room.estado === 'Activo');

  useEffect(() => {
    // Preselecciona las fechas del último mes como valor inicial
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    setStartDate(lastMonth);
    setEndDate(today);
    const formattedDate = FormatDate(today)
    setLastUpdated(formattedDate);
  }, []);

  const filteredReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.fechaReservaDesde);
    return startDate <= reservationDate && reservationDate <= endDate;
  });

  const data = [
    [
      { type: 'string' },
      'Reservaciones',
    ],
    ...filteredReservations.map((reservation) => [new Date(reservation.fechaReservaDesde).getMonth(), 5.2]),
  ];

  const options = {
    title: 'Cantidad de Reservaciones entre meses',
    titleTextStyle: {
      color: '#000',
      fontSize: 15, // Cambia este valor a 'white' o cualquier color hexadecimal blanco que prefieras
    },
    curveType: 'function',
    legend: {
      position: 'bottom',
      textStyle: {
        color: '#000' // Cambia este valor a 'white' o cualquier color hexadecimal blanco que prefieras
      }
    },
    colors: ['red'],
    vAxis: {
      gridlines: { color: 'transparent' },
      textStyle: {
        color: '#000' // Cambia este valor a 'white' o cualquier color hexadecimal blanco que prefieras
      }
    },
    hAxis: {
      gridlines: { color: 'transparent' },
      textStyle: {
        color: '#000' // Cambia este valor a 'white' o cualquier color hexadecimal blanco que prefieras
      }
    },
    backgroundColor: {
      fill: '#FDFEFE' // Cambia este valor al color de fondo que desees
    },
    chartArea: {
      borderRadius: 30 // Ajusta este valor según el radio de redondeo deseado
    }
  };

  return (
    <div className="container"  style={{ marginTop: 100 }}>
      <div className="row rounded mx-1 my-2" data-aos="fade-out" data-aos-delay={150} style={{ height: 50, background: 'linear-gradient(to bottom, #feffff 0%,#d2ebf9 100%)' }} >
      </div>
      <div className="row" data-aos="fade-out" data-aos-delay={150}>
        <div className='col-12 col-lg-6'>
          <div className=" mb-4">
            <div className="card-body" style={{}}>
              <div className="row">

                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                      Fecha de inicio:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="form-control"
                      value={startDate ? startDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                      style={{ height: 35, maxWidth: 250 }}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      Fecha de fin:
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      className="form-control"
                      value={endDate ? endDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setEndDate(new Date(e.target.value))}
                      style={{ height: 35, maxWidth: 250 }}
                    />
                  </div>
                </div>
              </div>

              <div className="row rounded ">
                {filteredReservations.length > 0 ? (
                  <Chart className='border rounded-2' chartType="LineChart" data={data} options={options} height="350px" />
                ) : (
                  <p className="fs-6">No se encontró información para el rango de fechas seleccionado</p>
                )}
              </div>
            </div>
            <div className="small text-muted mx-sm-3">Actualizado el {lastUpdated}</div>
          </div>
        </div>
        <div className='col-12 col-lg-6'>
          <div className=" mb-4" style={{ marginTop: 60 }}>
            <div className="card-body">
              <div className="row">
                <div className="col-12 ">
          
                    <span>
                      Total de Habitaciones: {rooms.length}
                    </span>

            
                </div>
             
                <div className="row rounded ">
                {filteredReservations.length > 0 ? (
                  <Chart className='border rounded-2'  chartType="PieChart" data={[
                    ["category", "cant"],
                    ["Total", rooms.length],
                    ["Activa", habitacionesActivas.length],
                    ["Inactiva", (rooms.length) - (habitacionesActivas.length)],
                  ]} options={{title: "Habitaciones"}} height="350px" />
                ) : (
                  <p className="fs-6">No se encontró información</p>
                )}
              </div>

              </div>
            </div>
            <div className="small text-muted mx-sm-3">Actualizado el {lastUpdated}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
