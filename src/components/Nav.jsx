import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const Nav = () => {
    const { auth, handleAuth } = useContext(AuthContext)
    const location = useLocation();

    const cerrarSession = () => {
        handleAuth(null)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger border-bottom border-light text-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <a className="navbar-brand me-5" data-aos="fade-out" data-aos-delay={150} href="/">CABINAS GUANACASTE</a>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo03">
                        <ul className="navbar-nav" data-aos="fade-out" data-aos-delay={150}>
                            <li className="nav-item px-2">
                                <a className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" href="/">Inicio</a>
                            </li>

                            <li className="nav-item px-2">
                                <a className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`} href="/rooms" tabIndex={-1} aria-disabled="true">Habitaciones</a>
                            </li>

                            {auth ?
                                <li className="nav-item px-2">
                                    <a className={`nav-link ${location.pathname === '/myReservations' ? 'active' : ''}`} href="/myReservations" tabIndex={-1} aria-disabled="true">Reservas</a>
                                </li>
                                : null}
                            {location.pathname === '/' ? <li className="nav-item px-2">
                                <a className={`nav-link`} href="/#contactanos">Contactanos</a>
                            </li> : null}


                            {auth && auth.tipo === "Administrador" ?
                                <li className="nav-item px-2">
                                    <a className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard" tabIndex={-1} aria-disabled="true">Adm.Panel</a>
                                </li>
                                : null}

    

                            {auth ?
                                <li className="dropdown nav-item px-2">
                                    <div className="nav-link dropdown-toggle border-0 " data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer' }}><span className="fa fa-gear" /></div>
                                    <ul className="dropdown-menu" style={{ minWidth: 10 }}>
                                        <li><a className="dropdown-item" href="/profile"> <span className="fa fa-user fa-fade" /> Perfil</a></li>
                                        <li><button className="dropdown-item" onClick={cerrarSession} ><span className="fa fa-sign-out fa-fade" /> Salir</button></li>
                                    </ul>
                                </li>
                                :
                                <li className="nav-item me-auto px-2"> {/* Utiliza ml-auto para alinear a la derecha */}
                                    <a className="nav-link" href="/login" tabIndex={-1} aria-disabled="true">Iniciar sesión <span className="fa fa-sign-in fa-fade"></span></a>
                                </li>
                            }

                            <li className="nav-item px-2">
                                <div className="nav-link" tabIndex={-1} aria-disabled="true">&emsp;</div>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav