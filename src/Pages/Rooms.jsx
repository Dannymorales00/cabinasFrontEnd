import React, { useEffect } from 'react'
import Room from '../components/Room';
import Nav from '../components/Nav';
import { useState } from 'react';
import axios from './../Axios/configAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

const Rooms = () => {
    const itemsPerPage = 6;
    const [Rooms, setRooms] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); 
    const [currentPage, setCurrentPage] = useState(0);

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

    useEffect(() => {
        if (Rooms) {
            const sortedRooms = [...Rooms];
            sortedRooms.sort((a, b) => {
                const priceA = a.precio;
                const priceB = b.precio;
                return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
            if (!arraysAreEqual(sortedRooms, Rooms)) {
                setRooms(sortedRooms);
            }
        }

    }, [sortOrder, Rooms]);

    // Función para verificar si dos arrays son iguales
    function arraysAreEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const indexOfLastRoom = (currentPage + 1) * itemsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
    const currentRooms = Rooms && Rooms.slice(indexOfFirstRoom, indexOfLastRoom);


    return (
        <>
            <ToastContainer theme="light" position="bottom-right" />
            <header className='site-header m-0 p-0'>
                <Nav />
            </header>
            <section className="section blog-post-entry  mt-5">
                <div className="container-fluid">

                    <div className="row justify-content-center align-items-center  rounded  mt-2" data-aos="fade-up" data-aos-delay={110} style={{ height: '56vh', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1), rgba(200,200,200,0.5))' }} >
                        <div className="col-md-12 text-center border-top border-bottom border-dark" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.9))' }}>
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
                <div className="row m-2 justify-content-end">
                    <div className="col-auto">
                        <label className="form-label me-2">Ordenar por precio:</label>
                        <select
                            className="form-select"
                            onChange={(e) => {
                                setSortOrder(e.target.value);
                            }}
                        >
                            <option value="asc">Menor a Mayor</option>
                            <option value="desc">Mayor a Menor</option>
                        </select>
                    </div>
                </div>
                <div className="row m-2 row-cols-1 row-cols-sm-2 row-cols-lg-3 mb-0 mt-5 text-center">
                    {currentRooms &&
                        currentRooms.map((room, index) => (
                            <div
                                data-aos="fade-right"
                                data-aos-delay={index % 2 === 0 ? 200 : 100}
                                key={room.id}
                            >
                                <Room room={room} />
                            </div>
                        ))}
                </div>

                {Rooms && (
                    <div className='ms-2 ms-sm-5' style={{height:220}} data-aos="fade" data-aos-delay={150}>
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={"..."}
                            breakClassName={'page-item'}
                            pageCount={Math.ceil(Rooms.length / itemsPerPage)}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            onPageChange={handlePageClick}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakLinkClassName={"page-link"}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                )}

            </div >
        </>
    )
}

export default Rooms