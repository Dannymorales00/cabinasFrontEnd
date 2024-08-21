import React, { useState, useContext, useEffect, useCallback } from 'react';
// import convert from "image-file-resize";
import { FileUploader } from "react-drag-drop-files";
import axios from '../Axios/configAxios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import TblShedules from '../components/TblShedules';
import EditInfoContact from '../components/EditInfoContact';
import NavDashBoard from './../components/NavDashBoard';

const EditRoom = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [ImageBlobLocal, setImageBlobLocal] = useState([]);
    const [ImageBlobCloudinary, setImageBlobCloudinary] = useState([]);
    const [ImageUrlCloudinary, setImageUrlCloudinary] = useState([]);
    const [ImageUrlCloudDelete, setImageUrlCloudDelete] = useState([]);
    const [ImageLocal, setImageLocal] = useState([]);
    const [FormShedules, setFormShedules] = useState([]);
    const [FormInfoContact, setFormInfoContact] = useState(null);
    const handleInputChangeShedules = (e, id) => {
        const { name, value } = e.target;
        const updatedFormShedules = [...FormShedules];
        updatedFormShedules[id] = { ...updatedFormShedules[id], [name]: value };
        setFormShedules(updatedFormShedules);
    };
    const handleSwitchChange = (e, id) => {
        const { name, checked } = e.target;
        const updatedFormShedules = [...FormShedules];
        updatedFormShedules[id] = { ...updatedFormShedules[id], [name]: (checked ? 1 : 0) };
        setFormShedules(updatedFormShedules);
    };
    const handleInputChangeInfoContact = (e) => {
        const { name, value } = e.target;
        setFormInfoContact((prevInfo) => ({ ...prevInfo, [name]: value }));
    };
    const navigate = useNavigate();
    const handleUploadLocalImages = useCallback(async (imagenes) => {
        try {
            const listUrl = await Promise.all(imagenes.map(async (imagen) => {
                const respuesta = await fetch(imagen.url);
                const datosImagen = await respuesta.blob();
                const blob = new Blob([datosImagen]);
                const urlBlob = URL.createObjectURL(blob);
                return urlBlob;
            }));
            setImageBlobCloudinary(listUrl);
            setImageUrlCloudinary(imagenes);
        } catch (error) {
            console.error('Error al descargar las imágenes:', error);
        }
    }, []);

    useEffect(() => {
        if (FormShedules.length === 0 || FormInfoContact === null) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            axios.get(`home/`, config)
                .then(res => {
                    if (res.status === 200) {
                        setFormInfoContact(res.data.infoContact);
                        setFormShedules(res.data.shedules);
                        handleUploadLocalImages(res.data.imagesHome);
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

    }, [FormInfoContact, FormShedules, handleUploadLocalImages, id, token]);

    const handleFileChange = (files) => {
        const imagenesPermitidas = ['.jpg', '.jpeg', '.png'];
        if (((ImageLocal.length + files.length + ImageBlobCloudinary.length) > 1 && (ImageBlobLocal.length + files.length + ImageBlobCloudinary.length) > 1) || files.length > 1) {
            toast('Solo puede agregar 1 imágenes');
            return;
        }
        if (files.length === 0) {
            toast('No selecciono una imagen');
            return;
        }
        const filesArrray = Array.from(files);
        let ListUrls = [];
        let ListFiles = [];
        filesArrray.forEach((file) => {
            if (file.name === undefined || file.name === null) {
                toast('La imagen debe tener un nombre valido');
                return;
            }
            if (file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase() === undefined) {
                toast('La imagen debe tener una extension valida');
                return;
            }
            if (!imagenesPermitidas.includes(`.${file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()}`)) {
                toast(`Por favor, selecciona un archivo de imagen en formato: ${imagenesPermitidas}`);
                return;
            }
            //agregamos más imagenes a la lista de imagenes
            ListUrls.push(URL.createObjectURL(file));
            ListFiles.push(file);
        });
        setImageBlobLocal(ImageBlobLocal.concat(ListUrls));
        setImageLocal(ImageLocal.concat(ListFiles));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ImageLocal.length === 0 && ImageBlobCloudinary.length === 0) {
            toast('Debe subir una imagen');
            return;
        }
        let imgsBase64 = [];
        try {
            const conversionesPromesas = ImageLocal.map(async (file) => {
                const base64 = await fileToBase64(file);
                imgsBase64.push({ "imgBase64": base64 });
            });
            // Esperar a que todas las conversiones se completen
            await Promise.all(conversionesPromesas);
        } catch (error) {
            console.error('Error al convertir el archivo a base64:', error);
        }
        if (imgsBase64.length > 0 || ImageBlobCloudinary.length > 0) {
            editarHome(imgsBase64);
        }
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const eliminar = (e) => {
        //console.log(ImageBlobLocal.splice(e.target.id,1));
        const imgUrl = ImageBlobLocal.slice();
        imgUrl.splice(e.target.id, 1);
        setImageBlobLocal(imgUrl);
        const file1 = ImageLocal.slice();
        file1.splice(e.target.id, 1);
        setImageLocal(file1);
    }


    const eliminarCloud = (e) => {
        //console.log(ImageBlobLocal.splice(e.target.id,1));
        const imgUrl = ImageBlobCloudinary.slice();
        console.log(imgUrl);
        console.log(e.target.id);
        setImageUrlCloudDelete(ImageUrlCloudDelete.concat(ImageUrlCloudinary[e.target.id]));
        imgUrl.splice(e.target.id, 1);
        setImageBlobCloudinary(imgUrl);
    }

    const editarHome = (imgsBase64) => {
        const imagenes = {
            "agregarImagenes": imgsBase64,
            "borrarImagenes": ImageUrlCloudDelete
        }
        const data = { shedules: FormShedules, infoContact: FormInfoContact, imagenes }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Ejemplo: 'Bearer tu-token-jwt'
            }
        }
        console.log(data);
        axios.put(`home/edit`, data, config)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    toast.info('se actualizo correctamente');
                    setTimeout(() => {
                        navigate("/dashboard");;
                    }, 2000);
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    toast.error(error.response.data.msg[0].msg);
                }
                if (error.response.status === 404) {
                    toast.error(error.response.data.msg);
                }
                console.log(error);
            })
            .finally(() => {
            })
    }
    return (
        <>
            <header className="site-header m-0 p-0">
                <NavDashBoard />
            </header>
            <ToastContainer theme="light" position="bottom-right" />
            <div className="container">
                <div className="row justify-content-center">
                    <div data-aos="fade-out" data-aos-delay={150} className="col col-12 col-sm-10 col-lg-6 col-xl-6  align-self-center">
                        <h2 className="mt-4">Editar Inicio</h2>
                        <form id='registerRoom' onSubmit={handleSubmit} className="" >
                            <div className=" text-white  rounded-3 my-5 bg-ligth border border-danger">
                                <p className="fs-5  bg-danger text-center">Editar Información de Contacto</p>
                                <div className="row my-3 p-3">
                                    {FormInfoContact ? <EditInfoContact infoContact={FormInfoContact} handleInputChangeInfoContact={handleInputChangeInfoContact} /> : null}
                                </div>
                            </div>

                            <div className=" text-white  rounded-3 my-5 bg-ligth border border-danger">
                                <p className="fs-5  bg-danger text-center">Editar Horarios</p>
                                <div className="row my-3 p-3">
                                    {FormShedules.length > 0 ? <TblShedules horarios={FormShedules} handleInputChangeShedules={handleInputChangeShedules} handleSwitchChange={handleSwitchChange} /> : null}
                                </div>
                            </div>
                            <div className=" text-white  rounded-3 my-5 bg-ligth border border-danger">
                                <p className="fs-5  bg-danger text-center mb-0">Editar banner</p>
                                <div className=" rounded-2 mb-3 p-2  bg-dark" style={{ maxHeight: 510, minHeight: 300 }} >
                                    <div className="row" >
                                        {ImageBlobCloudinary.length > 0 ?
                                            ImageBlobCloudinary.map((url, index) =>
                                                <div key={index} className="col">
                                                    <div className="card mt-2" >
                                                        <img src={url} className="card-img-top " id={'img' + index} alt="img..." style={{ cursor: 'not-allowed' }} />
                                                        <div className="overlayImg bg-dark" id={index} onClick={eliminarCloud}>
                                                            <span className="close-icon"><span className="fa fa-times fa-fade" /></span>
                                                        </div>

                                                    </div>
                                                </div>
                                            ) : null}
                                        {ImageLocal.length > 0 &&
                                            ImageBlobLocal.map((url, index) =>
                                                <div key={index} className="col">
                                                    <div className="card mt-2" >
                                                        <img src={url} className="card-img-top " id={'img' + index} alt="img..." style={{ cursor: 'not-allowed' }} />
                                                        <div className="overlayImg bg-dark" id={index} onClick={eliminar}>
                                                            <span className="close-icon"><span className="fa fa-times fa-fade" /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className='bg-light' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '180px', overflowY: 'auto' }}>
                                    <FileUploader multiple={true}
                                        label="sube o arrastra imagenes &nbsp;&nbsp;"
                                        hoverTitle="suelta aquí" types={["JPG", "PNG", "JPEG"]}
                                        maxSize={5} handleChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="col-12 my-5 w-100 text-center">
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}
export default EditRoom;
