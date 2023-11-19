import axios from '../Axios/configAxios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './../components/Footer';
import Nav from '../components/Nav';

function Home() {

    const [infoHome, setInfoHome] = useState(null);

    useEffect(() => {

        axios.get('home').then((response) => {
            // console.log(response);
            if (response.status === 200) {
                //console.log(response.data);
                //toast.success("Se cargo infoHome!");
                setInfoHome(response.data)
            }

        }).catch((error) => {
            console.log(error.response)
            //toast.error("Ocurrió un error inesperado "+ error.response.data.error);
            toast.error("problema de conexión detectado");
        });

    }, []);

    return (
        <>
            <ToastContainer theme="light" position="bottom-right" />
            <header className="site-header m-0 p-0">
                <Nav />

            </header>
            {infoHome ?
                <section className="site-hero overlay" style={{ backgroundImage: `url(${infoHome.imagesHome[0].url})` }}>                <div className="container">

                    <div className="row site-hero-inner justify-content-center align-items-center">
                        <div className="col-md-10 text-center">

                            <h1 className="heading" data-aos="fade-up" data-aos-delay={100}>Bienvenido a <em>Cabinas Guanacaste</em></h1>
                            <p className="sub-heading mb-5" data-aos="fade-up" data-aos-delay={100}>Descubre nuestras cabinas.</p>
                            <p data-aos="fade-up" data-aos-delay={150}> <a href="#contactanos" className="btn uppercase btn-outline-light d-sm-inline d-block">Contactanos</a></p>
                        </div>
                    </div>
                </div>
                </section> : null}
            {/* END section */}
            <section className="section testimonial-section" data-aos="fade-up" data-aos-delay={100} style={{ height: '80vh', marginTop: '10%' }}>
                <div className="container">
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-md-8">
                            <h2 className="heading">¿Quienes somos?</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-5">
                            <div className="testimonial text-center">

                                <blockquote>
                                    <p>
                                        Cabinas Guanacaste nació en el corazón de Cañas para satisfacer la creciente demanda de hospedaje en la región. Desde sus inicios en 1997, ha sido la opción preferida tanto para los habitantes locales como para visitantes en busca de un alojamiento acogedor y accesible. Descubre la esencia de nuestra hospitalidad en el lugar perfecto para una estancia temporal inolvidable.</p>
                                </blockquote>
                            </div>
                        </div>

                        {/* END col */}
                    </div>
                </div>
            </section>
            <section className="section visit-section">
                <div className="container">
                    <div className="row">

                        <br />
                        <div className="col-md-12">
                            <h2 className="heading fs-4" data-aos="fade-right">Servicios</h2>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className=" col-lg-3 col-md-6 visit mb-3" data-aos="fade-right" data-aos-delay={100}>
                            <img src="/img/AC_img.png" alt="" className="img-fluid" />
                            <p className='fs-5'>Aire Acondicionado</p>

                        </div>
                        <div className="col-lg-3 col-md-6 visit mb-3" data-aos="fade-right" data-aos-delay={100}>
                            <img src="img/wifi_img.png" alt="" className="img-fluid" />
                            <p className='fs-5'>Wifi</p>

                        </div>
                        <div className="col-lg-3 col-md-6 visit mb-3" data-aos="fade-right" data-aos-delay={200}>
                            <img src="img/Parqueo_img.png" alt=" placeholder" className="img-fluid" />
                            <p className='fs-5'>Parqueo</p>

                        </div>
                        <div className="col-lg-3 col-md-6 visit mb-3" data-aos="fade-right" data-aos-delay={300}>
                            <img src="img/Seguridad_img.png" alt=" placeholder" className="img-fluid" />
                            <p className='fs-5'>Seguridad</p>

                        </div>
                    </div>
                </div>
            </section>
            {/* END section */}

            {/* END section */}
            <section className="section bg-pattern" id='contactanos'>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-12 col-md-6  rounded" data-aos="fade-up" style={{ background: 'rgba(0,0,0,0.8)' }}>
                            <p className=" fs-3 text-white img-fluid mt-4" >Ubicación</p>
                            <iframe title='maps' src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3924.1372840203535!2d-85.08736725114726!3d10.410669518738672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scabinas%20guanacaste!5e0!3m2!1ses-419!2scr!4v1700135907377!5m2!1ses-419!2scr" width={400} height={300} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                        <div className="col-12 col-md-6 rounded" data-aos="fade-up" style={{ background: 'rgba(0,0,0,0.8)' }}>
                            <div style={{ maxHeight: 500 }}>
                                <p className="fs-3 text-white mt-4" >Contactanos</p>
                                <form action="https://formsubmit.co/9be4145b12a13de767a9b9171259a790" method="post" className=" p-4 " >
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" id="nombre" name='nombre' autoComplete='nombre' className="form-control " style={{ height: 35 }} />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="telefono">Telefono</label>
                                            <input type="text" id="telefono" name='telefono' autoComplete='telefono' className="form-control " style={{ height: 35 }} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                            <label htmlFor="correo">Correo</label>
                                            <input type="email" id="correo" name='correo' autoComplete='correo' className="form-control " style={{ height: 35 }} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                            <label htmlFor="mensaje">Escribe un mensaje</label>
                                            <textarea name="mensaje" id="mensaje" autoComplete='mensaje' className="form-control " cols={30} rows={5} defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="row text-center my-3">
                                        <div className="col-md-6 form-group mx-auto">
                                            <input type="submit" value="Enviar mensaje" className="btn btn-primary" />
                                        </div>
                                    </div>
                                    <input type="hidden" name="_next" value={process.env.REACT_APP_HOST}></input>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Footer infoHome={infoHome} />
        </>



    )
}

export default Home