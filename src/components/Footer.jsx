import React from 'react'
const Footer = (props) => {
    const { infoHome } = props;


    return (
        <footer className="section footer-section">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-3 mb-5">
                        <ul className="list-unstyled link">
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/rooms">Habitaciones</a></li>
                            <li><a href="/login">Iniciar sessión</a></li>

                        </ul>
                    </div>
                    <div className="col-md-3 mb-5 contact-info">
                        {(infoHome && infoHome.infoContact) ?
                            <>
                                <p><span className="d-block">Teléfono:</span> <span> (+506) {infoHome.infoContact.telefono1}</span>      </p>
                                {infoHome.infoContact.telefono2 ?
                                    <p> <span>(+506) {infoHome.infoContact.telefono2}</span></p>
                                    :
                                   null
                                }
                            </>
                            : null

                        }
                    </div>
                    <div className="col-md-3 mb-5 pr-md-5 contact-info">

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
                    <div className="col-md-3 mb-5">


                    </div>
                </div>
                <div className="row bordertop pt-5">
                    <p className="col-md-6 text-left">
                        Copyright © Todos los derechos reservados | hecho por <a href="https://github.com/Dannymorales00" target="_blank" rel="noreferrer">Danny Morales</a>
                    </p>
                    <p className="col-md-6 text-right social">
                        <a href="#"><span className="fa fa-whatsapp" /></a>
                        <a href="#"><span className="fa fa-facebook" /></a>
                        <a href="#"><span className="fa fa-twitter" /></a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer