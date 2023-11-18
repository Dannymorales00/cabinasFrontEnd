import { useState } from 'react'

const Room = ({ room }) => {
    const [imagenCargada, setImagenCargada] = useState(false);

    const manejarErrorImagen = (e) => {
        if (!imagenCargada) {
            e.target.src = 'img/room_genenic.jpg'; // Cargar imagen por defecto en caso de error
            setImagenCargada(true);
        }
    };
    return (
        <div className="col shadow-sm">
            <div className="card mb-4 shadow-sm" style={{ minHeight: 180, borderImage: 'linear-gradient(to bottom, red, black) 1' }}>
                <img
                    src={room.imagenes.length > 0 ? room.imagenes[0].url : 'img/room_genenic.jpg'}
                    className="card-img-top shadow-sm"
                    alt=""
                    style={{ maxHeight: 250 }}
                    onError={manejarErrorImagen}
                />
                <div className="card-body" style={{ height: 350 }}>
                    <p className="card-text fw-bold fs-4 m-0">habitación {room.numero}</p>
                    <p className="card-text fw-bold fs-5 m-0">{room.capacidad} personas</p>
                    {room.porcentajeDescuento > 0 ?
                        <>
                          
                            <p className="card-text fw-bold fs-4 m-0">₡{room.precio - (room.precio * (room.porcentajeDescuento / 100))} CRC   <span className="card-text fw-bold fs-6 text-decoration-line-through m-0">₡{room.precio}</span></p>
                            {/* <p className="card-text  fs-6 m-0">por hora</p> */}
                            <p className="card-text bg-danger text-light m-0">{room.porcentajeDescuento}% descuento</p>
                        </>
                        :
                        <>
                        
                            <p className="card-text fw-bold fs-4 m-0">₡{room.precio} CRC <span className="card-text m-0"><br></br></span></p>
                            {/* <p className="card-text  fs-6 m-0">por hora</p> */}
                            <p className="card-texT text-light m-0"> <br /></p>
                        </>
                    }
                    <div className="row px-2 mx-2 mt-3 mt-sm-4">

                        <div className='col m-0 mx-sm-2 fs-5' style={{ cursor: 'pointer' }}> <span className="fa fa-wifi"> Wifi</span></div>
                        <div className='col  m-0 mx-sm-2 fs-5'> <span className="fa fa-car "> Parqueo</span></div>
                        <div className='col  m-0 mx-sm-2 fs-5'> <span className="fa fa-snowflake-o "> A/C</span></div>
                    </div>

                    <br />
                    <a className='btn btn-danger mt-0' href={`/roomDetails/${room.id}`}> Reservar </a>
                </div>
            </div>
        </div >

    )
}

export default Room
