import React, { useEffect } from 'react'
import Room from '../components/Room';
import Nav from '../components/Nav';
import { useState } from 'react';
import axios from './../Axios/configAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rooms = () => {
    const [Rooms, setRooms] = useState(null);

    useEffect(() => {
        if (!Rooms) {
            axios.get('rooms').then((response) => {
                if (response.status === 200) {
                    // console.log(response);
                    setRooms(response.data)
                }
            }).catch((error) => {
                console.log(error)
                toast.error("problema de conexión detectado");
            });
        }

    }, [Rooms]);

    return (
        <>
            <ToastContainer theme="light" position="bottom-right" />
            <header className='site-header m-0 p-0'>
                <Nav />
            </header>
            <section className="section blog-post-entry  mt-5">
                <div className="container-fluid">

                    <div className="row justify-content-center align-items-center  rounded  mt-2" data-aos="fade-up" data-aos-delay={110} style={{ height: '56vh', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1), rgba(200,200,200,0.5))'}} >
                        <div className="col-md-12 text-center border-top border-bottom border-dark" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.9))'}}>
                            <div className="row " >
                                <div className="col-12 col-lg-6 d-none d-lg-block text-center my-4">
                                    <img src={'/img/bedroom_5233813.png'}
                                        className="card-img-top rounded  "
                                        alt="..."
                                        style={{ maxHeight: 250, maxWidth: 300, marginTop: '10%', opacity: '0.9' }}></img>
                                </div>
                                <div className="col-12 col-lg-6 text-center my-4 pe-0 pe-lg-5">
                                    <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p className="fs-4 fw-5 m-5 text-dark" style={{ lineHeight: '2.0' }} >Descubre el encanto y la comodidad en nuestras habitaciones, ofrecemos un refugio perfecto para viajeros.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid">
         


                <div className="row m-2 row-cols-1 row-cols-sm-2 row-cols-lg-3 mb-3 mt-5 text-center">
                    {Rooms && Rooms.map((room, index) =>
                        <div data-aos="fade-right" data-aos-delay={(index % 2 === 0 ? 200 : 100)} key={room.id}>
                            <Room room={room} />
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default Rooms