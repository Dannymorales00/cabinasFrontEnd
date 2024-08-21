import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PayPalButton from '../components/PayPalButton';
import AuthContext from './../context/AuthContext';
import axios from './../Axios/configAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './../components/Nav';


function RoomDetails() {
    const { id } = useParams();
    const { token, auth } = useContext(AuthContext);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [Room, setRoom] = useState(null);
    const [TipoCambio, setTipoCambio] = useState(0);
    const [Total, setTotal] = useState(0);
    const [imagenCargada, setImagenCargada] = useState(false);
    const [DateVerify, setDateVerify] = useState(false);


    // Funciones para calcular subtotal y total
    const timeDifference = useCallback(() => {
        return Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60));
    }, [checkInDate, checkOutDate]);

    const subTotalCostoxHora = useCallback(() => {
        return timeDifference() * parseInt(Room.precio);
    }, [Room, timeDifference]);

    const subTotalDescuento = useCallback(() => {
        return subTotalCostoxHora() === 0 || Room.porcentajeDescuento === "0"
            ? 0
            : (parseInt(Room.precio) * parseInt(Room.porcentajeDescuento)) / 100;
    }, [Room, subTotalCostoxHora]);

    const totalPrecio = useCallback(() => {
        const subTotal = subTotalCostoxHora() - subTotalDescuento();
        return subTotal;
    }, [subTotalCostoxHora, subTotalDescuento])

    useEffect(() => {

        if (!Room) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            axios.get(`rooms/${id}`, config)
                .then(res => {
                    if (res.status === 200) {
                        setRoom(res.data);
                        // console.log(res);
                    }
                })
                .catch(error => {

                    if (error.response.status === 400) {
                        console.log(error.response.data.msg[0].msg);
                        toast.error(error.response.data.msg[0].msg);
                    }
                    if (error.response.status === 404 || error.response.status === 401) {
                        toast.error(error.response.data.msg);
                    }
                });
        }

        if (!Room && !TipoCambio) {

            fetch('https://tipodecambio.paginasweb.cr/api/')
                .then(response => response.json())
                .then(data => {
                    if (data.venta && data.venta > 0) {
                        setTipoCambio((data.venta))

                    } else {
                        toast.error('Error al obtener el tipo de cambio');
                    }
                    // console.log(data);

                })
                .catch(error => {
                    console.error('Error al obtener el tipo de cambio:', error);
                    toast.error('Error al obtener el tipo de cambio');
                });

        }

        if (Room) {
            setTotal(totalPrecio())

        }
    }, [Room, TipoCambio, id, token, totalPrecio]);

    // Función para manejar el pago
    const handlePayment = (order) => {

        if (order) {
            const reservation = {
                idUsuario: auth.id,
                idPaypalPago: order.id,
                numeroHabitacion: Room.numero,
                cantidadHuespedes: Room.capacidad,
                estadoReserva: 'Confirmada',
                montoReserva: Total,
                montoTotal: Total,
                fechaReservaDesde: formatDate(checkInDate),
                fechaReservaHasta: formatDate(checkOutDate),
                metodoPago: 'Paypal',
                estadoPago: 'Confirmado',
                porcentajeDescuento: Room.porcentajeDescuento

            }

            console.log(reservation);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            axios.post(`reservations`, reservation, config)
                .then(res => {
                    if (res.status === 200) {

                        setIsPaymentComplete(true);
                        setDateVerify(false);
                        console.log(res);
                    }
                })
                .catch(error => {

                    if (error.response.status === 400) {
                        console.log(error.response.data.msg[0].msg);
                        toast.error(error.response.data.msg[0].msg);
                    }
                    if (error.response.status === 404 || error.response.status === 401) {
                        toast.error(error.response.data.msg);
                    }
                });
        }




    };

    const maxDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate);
        maxDate.setFullYear(currentDate.getFullYear() + 2);
        return maxDate.toISOString().slice(0, -8);
    };

    const formatDate = (fechaOriginal) => {


        const año = fechaOriginal.getFullYear();
        const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes, ya que los meses van de 0 a 11
        const día = fechaOriginal.getDate().toString().padStart(2, '0');
        const horas = fechaOriginal.getHours().toString().padStart(2, '0');
        const minutos = fechaOriginal.getMinutes().toString().padStart(2, '0');

        const fechaFormateada = `${año}-${mes}-${día}T${horas}:${minutos}`;
        return fechaFormateada;

    }
    const manejarErrorImagen = (e) => {
        if (!imagenCargada) {
            e.target.src = '/img/room_genenic.jpg'; // Cargar imagen por defecto en caso de error
            setImagenCargada(true);
        }
    };

    const handleCheckIn = (e) => {
        setCheckOutDate(new Date(e.target.value))
        setCheckInDate(new Date(e.target.value))
        setDateVerify(false);
        setIsPaymentComplete(false);
        document.getElementById('checkOutDate').min = formatDate(new Date(e.target.value));
    }
    const handleCheckOut = (e) => {
        if (checkInDate > (new Date(e.target.value))) {
            return toast.error('la fecha de salida debe ser porterior a la de entrada');
        }
        setCheckOutDate(new Date(e.target.value))
        setDateVerify(false);
        setIsPaymentComplete(false);
    }

    const handleVerify = (e) => {
        const { id } = e.target

        if (Total <= 0) {
            return toast.info('debes selecionar las fechas de reserva');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        const data = {
            fechaReservaDesde: checkInDate,
            fechaReservaHasta: checkOutDate
        }

        axios.post(`reservations/available/${id}`, data, config)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res);
                    toast.success(res.data.msg);
                    setDateVerify(true);

                }
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 400) {
                    toast.error(error.response.data.msg);
                }
                if (error.response.status === 404 || error.response.status === 401) {
                    toast.error(error.response.data.msg);
                }
            });


    }

    const showPayButton = () => {
        return ((Total > 0) && (TipoCambio > 0) && DateVerify)
    }



    return (
        <>
            <header className="site-header m-0 p-0">
                <Nav />

            </header>
            <div className="container mt-md-3" style={{ minHeight: "97vh" }}>
                <ToastContainer theme="light" position="bottom-right" />
                {Room ? (
                    <div className="row " style={{ marginTop: '17vh' }}>
                        <div className="col " >
                            <div className="col-12 col-sm-12">
                                <div className="row p-2 p-sm-4 shadow border-start border-dark border-3 rounded" style={{ minHeight: 550, background: 'linear-gradient(45deg, rgba(255,251,251,0.5646134918811274) 0%, rgba(193,184,184,0.46377315574667366) 100%)' }}>

                                    <div className="col-sm-6  p-3" style={{ minHeight: 270 }}>
                                        <div id={"carouselExampleFade" + Room.id} className="carousel slide carousel-fade p-2" data-bs-interval="3000" data-bs-ride="carousel">
                                            <div className="carousel-inner text-center" >

                                                {Room.imagenes &&
                                                    Room.imagenes.map((img, index) => index === 0 ?
                                                        <div key={index} className="carousel-item active">
                                                            <img src={img ? img.url : '/img/room_genenic.jpg'}
                                                                className=" card-img-top shadow  img-fluid rounded"
                                                                alt="..."
                                                                onError={manejarErrorImagen}
                                                                style={{ maxHeight: 222, minHeight: 200, maxWidth: 350 }} />
                                                        </div> :
                                                        <div key={index} className="carousel-item">
                                                            <img src={img ? img.url : '/img/room_genenic.jpg'}
                                                                className="card-img-top shadow img-fluid rounded"
                                                                alt="..."
                                                                onError={manejarErrorImagen}
                                                                style={{ maxHeight: 222, minHeight: 200, maxWidth: 350 }} />
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleFade" + Room.id} data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleFade" + Room.id} data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-sm-6  p-0">
                                        <div className="mx-4 mx-sm-2 mx-lg-4 mt-2 mt-sm-4">
                                            <div className="mb-3 mt-5">
                                                <label className='fs-6 fw-bold'>Fecha de Entrada:</label>
                                                <input
                                                    style={{ maxWidth: 250, height: 40 }}
                                                    className="form-control"
                                                    type="datetime-local"
                                                    value={formatDate(checkInDate)}
                                                    onChange={handleCheckIn}
                                                    min={formatDate(new Date())}
                                                    max={maxDate()}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className='fs-6 fw-bold'>Fecha de Salida:</label>
                                                <input style={{ maxWidth: 250, height: 40 }} className="form-control "
                                                    type="datetime-local"
                                                    id="checkOutDate"
                                                    name="checkOutDate"
                                                    value={formatDate(checkOutDate)}
                                                    onChange={handleCheckOut}
                                                    min={formatDate(new Date())}
                                                    max={maxDate()}
                                                />
                                            </div>
                                            <p className='fw-bold'>Cantidad de Horas: {timeDifference()} horas</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 my-0" >
                                        <div className=" row rounded border border-white rounded bg-white mx-sm-3">
                                            <div className="col-12 col-sm-12 col-lg-6">
                                                <p className='my-1 mx-2 fs-6 fw-bold '>Detalles de la Habitación</p>
                                                <p className='my-0 mx-2 py-0 fs-6'>Numero Habitación: <span className='fs-5 fw-bold'>{Room.numero}</span></p>
                                                <p className='my-0 mx-2 py-0 fs-6 '>Capacidad: <span className='fs-5 fw-bold'>{Room.capacidad}</span></p>
                                                {Room.porcentajeDescuento > 0 ?
                                                    <p className='my-0 mx-2 py-0 fs-6 '>Descuento: <span className='fs-5 fw-bold'>{Room.porcentajeDescuento}%</span></p>
                                                    :
                                                    <p className='my-0 mx-2 py-0 fs-6 '><span className='fs-5 fw-bold'></span></p>
                                                }
                                                <p className='my-0 mx-2 py-0 fs-6 '>Precio: <span className='fs-5 fw-bold'> {Room.precio}</span> CRC por hora</p>

                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-6 text-center text-sm-center text-md-end text-lg-center p-2 mt-lg-5">
                                                <p className='mx-lg-5 mx-2 my-0 me-md-4 fs-5 '>Disponibilidad <span className={`fa ${DateVerify ? 'fa-check-square-o' : 'fa-square-o'}`} /> </p>
                                                <button className='btn btn-warning text-dark' type='button'
                                                    name='verify' id={id}
                                                    onClick={handleVerify}
                                                    style={{ height: 40 }}
                                                >
                                                    verificar disponibilidad
                                                </button>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 border-start shadow border-dark border-2 rounded">
                            <div className=" mx-xl-5 mt-2 mt-sm-4 p-3 mx-sm-3 mx-0">
                                <p className='mb-0 fs-5'>Detalles de Costos</p>
                                <table className="table table-sm table-hover" style={{ maxWidth: 300 }}>
                                    <tbody>
                                        <tr>
                                            <th>Tarifa por Hora:</th>
                                            <td>₡ {parseInt(Room.precio)}</td>
                                        </tr>
                                        <tr>
                                            <th>{timeDifference()} hrs x ₡{parseInt(Room.precio)}:</th>
                                            <td>₡ {subTotalCostoxHora()}</td>
                                        </tr>
                                        <tr>
                                            <th>% de Descuento:</th>
                                            <td>{parseInt(Room.porcentajeDescuento)}%</td>
                                        </tr>
                                        <tr>
                                            <th>Descuento:</th>
                                            <td>₡ {subTotalDescuento()}</td>
                                        </tr>
                                        <tr>
                                            <th>Total a Pagar:</th>
                                            <td>₡ {Total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className=" mt-4 mb-4" style={{ maxWidth: 300 }}>
                                    <p className='fs-5 mt-5'>Método de pago</p>
                                    {isPaymentComplete ? (
                                        <div className='w-100'>
                                            <p className='mb-0 fs-5'>Pago completado. <span className="fa fa-check-circle-o fa-fade fa-lg" /></p>
                                            <p className='mb-0 fs-5'>Revisa tus reservaciones.</p>

                                        </div>
                                    ) : (
                                        showPayButton() ? (
                                            <PayPalButton handlePayment={handlePayment} totalvalue={(Total / TipoCambio).toFixed(2)} invoice={`pago habitación #${Room.numero}`} />
                                        ) : null
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div >

        </>
    );
}

export default RoomDetails;
