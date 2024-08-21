import React from 'react'
import TblSchedule from './TblSchedule';
const Footer = (props) => {
    const { infoHome } = props;

    return (
        <footer className="section footer-section">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-12 col-lg-3 col-md-6 mb-5 ">
                        <ul className="list-unstyled link">
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/rooms">Habitaciones</a></li>
                            <li><a href="/login">Iniciar sessión</a></li>
                            <li><a href="/register">Registrarse</a></li>

                        </ul>
                    </div>

                    <div className="col-12  col-lg-3 col-md-6 mb-5 contact-info ">
                        {(infoHome && infoHome.infoContact) ?
                            <>
                                <p><span className="d-block">Teléfono:</span> <span> (+506) {infoHome.infoContact.telefono1}</span>      </p>
                                {infoHome.infoContact.telefono2 ?
                                    <p> <span >(+506) {infoHome.infoContact.telefono2}</span></p>
                                    :
                                    null
                                }
                                <a href={infoHome.infoContact.urlWhatsApp} className="d-block">Chat <span className="fa fa-whatsapp fa-2x"></span></a>
                            </>
                            : null

                        }
                    </div>
                    <div className="col-12 col-lg-3 col-md-6 mb-5 pr-md-5 contact-info ">

                        {(infoHome && infoHome.infoContact) ?
                            <>
                                <p><span className="d-block">Dirección:</span> <span> {infoHome.infoContact.direccion}</span></p>
                                <p><span className="d-block">Correo:</span> <span> {infoHome.infoContact.correo} </span></p>
                            </>
                            :
                            <>
                                <p><span className="d-block">Dirección:</span> <span> .............................................</span></p>
                                <p><span className="d-block">Correo:</span> <span> ....................</span></p>
                            </>
                        }


                    </div>

                    <div className="col-12 col-lg-3 col-md-6 mb-5 contact-info">
                        {infoHome && infoHome.shedules && <TblSchedule schedules={infoHome.shedules} />}
                    </div>

                </div>
                <div className="row bordertop pt-5">
                    <p className="col-md-6 text-left">
                        Copyright © Todos los derechos reservados | hecho por <a href="https://github.com/Dannymorales00" target="_blank" rel="noreferrer">Danny Morales</a>
                    </p>
                    {/* <p className="col-md-6 text-right social">
                        {(infoHome && infoHome.infoContact) ?

                            <a href={infoHome.infoContact.urlWhatsApp}><span className="fa fa-whatsapp fa-2x"></span></a>
                            : null
                        }
                    </p> */}
                </div>
            </div>
        </footer >
    )
}

export default Footer