import React, { useState, useContext } from 'react';
// import convert from "image-file-resize";
import { FileUploader } from "react-drag-drop-files";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';
import axios from '../Axios/configAxios';
import NavDashBoard from './../components/NavDashBoard';

const NewRoom = () => {
    const { token } = useContext(AuthContext);
    const [ImageUrl, setImageUrl] = useState([]);
    const [File, setFile] = useState([]);
    const [FrmData, setFormData] = useState({
        numero: '',
        descripcion: '',
        estado: '',
        capacidad: '',
        precio: '',
        porcentajeDescuento: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FrmData, [name]: value });
    };

    const handleChangeInt = (e) => {
        e.target.value = e.target.value.replace(/[^\d]/ig, "")
        handleChange(e)
    };

    const handleFileChange = (files) => {
        const imagenesPermitidas = ['.jpg', '.jpeg', '.png'];
        if ((File.length + files.length > 3 && ImageUrl.length + files.length > 3) || files.length > 3) {
            toast('Solo puede agregar 3 imágenes');
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
        setImageUrl(ImageUrl.concat(ListUrls));
        setFile(File.concat(ListFiles));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (File.length === 0) {
            toast('Debe subir una imagen');
            return;
        }
        let imgsBase64 = [];
        try {
            const conversionesPromesas = File.map(async (file) => {
                const base64 = await fileToBase64(file);
                imgsBase64.push({ "imgBase64": base64 });
            });
            // Esperar a que todas las conversiones se completen
            await Promise.all(conversionesPromesas);
        } catch (error) {
            console.error('Error al convertir el archivo a base64:', error);
        }
        if (imgsBase64.length > 0) {
            crearHabitacion(imgsBase64);
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
        //console.log(ImageUrl.splice(e.target.id,1));
        const imgUrl = ImageUrl.slice();
        imgUrl.splice(e.target.id, 1);
        setImageUrl(imgUrl);
        const file1 = File.slice();
        file1.splice(e.target.id, 1);
        setFile(file1);
    }

    const crearHabitacion = (imgsBase64) => {
        const data = { ...FrmData, imagenes: imgsBase64 }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        console.log(data);
        axios.post('rooms/', data, config)
            .then(res => {
                if (res.status === 200) {          
                    toast.success('se registro correctamente');
                    setTimeout(() => {
                        window.location.reload(); 
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
         <ToastContainer theme="light" position="bottom-right" />
            <header className="site-header m-0 p-0">
                <NavDashBoard />

            </header>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-12 col-sm-10 col-lg-5 col-xl-5  align-self-center">
                        <h2 className="mt-4">Registrar Habitación</h2>
                        <form id='registerRoom' onSubmit={handleSubmit} className="" >
                            <div className=" text-white  rounded-3 my-5 bg-ligth border border-danger">
                                <p className="fs-5  bg-danger text-center">Datos de la Habitación</p>
                                <div className="row my-3 p-3">
                                    <div className="col-md-6">
                                        <label htmlFor="numero" className="form-label mt-2 text-dark">Numero</label>
                                        <div className="input-group ">
                                            <span className="input-group-text"><span className="fa fa-bed fa-fade" /></span>
                                            <input type="text" className="form-control"
                                                id="numero" name="numero"
                                                defaultValue={FrmData.numero} onChange={handleChangeInt}
                                                maxLength={4} style={{ height: 40 }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="col-md-6">
                                        <label htmlFor="capacidad" className="form-label mt-2 text-dark">Capacidad</label>
                                        <div className="input-group ">
                                            <span className="input-group-text"><span className="fa fa-users fa-fade" /></span>
                                            <input type="text" className="form-control"
                                                id="capacidad" name="capacidad"
                                                defaultValue={FrmData.capacidad} onChange={handleChangeInt}
                                                maxLength={1} style={{ height: 40 }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="precio" className="form-label mt-2 text-dark">Precio</label>
                                        <div className="input-group ">
                                            <span className="input-group-text">₡</span>
                                            <input type="text" className="form-control"
                                                id="precio" name="precio"
                                                onChange={handleChangeInt} defaultValue={FrmData.precio}
                                                style={{ height: 40 }}
                                                maxLength={7}
                                                // onKeyDown={
                                                //     (e) => {
                                                //         if (e.target.value.length >= 150 && e.key !== 'Backspace') {
                                                //             e.preventDefault();
                                                //         }
                                                //     }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="estado" className="form-label mt-2 text-dark">Estado</label>
                                        <select id="estado" name="estado"
                                            className="form-select" onChange={handleChange}
                                            style={{ height: 40 }}
                                            required
                                        >
                                            <option></option>
                                            <option>Activo</option>
                                            <option>Inactivo</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-5">
                                        <label htmlFor="porcentajeDescuento" className="form-label text-dark mb-0">Porcentaje de descuento</label>
                                        <div className="input-group ">
                                            <span className="input-group-text"><span className="fa fa-percent fa-fade" /></span>
                                            <input type="text" className="form-control"
                                                id="porcentajeDescuento" name="porcentajeDescuento"
                                                onChange={handleChangeInt} defaultValue={FrmData.porcentajeDescuento}
                                                maxLength={2}
                                                style={{ height: 40 }}
                                                required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="descripcion" className="form-label mt-2 text-dark">Descripción</label>
                                        <textarea placeholder='150 carácteres maximo' className="form-control"
                                            id="descripcion" onChange={handleChange} name="descripcion"
                                            defaultValue={FrmData.descripcion}
                                            maxLength={150}
                                            style={{ minHeight: 100 }}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-0 text-white rounded-3 mt-5  mb-5 bg-light border border-danger"  >
                                <p className="fs-6 py-2 bg-danger text-center">Arrastra las imagenes para agregarlas</p>
                                <div className=" rounded-2 mb-5 p-2" >
                                    <div className="row row-cols-lg-4 row-cols-2" style={{ minHeight: 150 }}>
                           
                                        {File.length > 0 &&

                                            ImageUrl.map((url, index) =>
                                                <div key={index} className="col">
                                                    <div className="card mt-3" >
                                                        <img src={url} className="card-img-top w-100 " id={index} alt="img..." style={{ maxHeight: 140, minHeight: 80, cursor: 'not-allowed' }} />
                                                        <div className="overlayImg bg-dark" id={index} onClick={eliminar}>
                                                            <span className="close-icon"><span className="fa fa-times fa-fade" /></span>
                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '180px', overflowY: 'auto' }}>
                                    <FileUploader required multiple={true} 
                                    label="sube o arrastra imagenes &nbsp;&nbsp;" 
                                    hoverTitle="suelta aquí" types={["JPG", "PNG", "JPEG"]} 
                                    maxSize={5} handleChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="col-12 my-5 w-100 text-center">
                                <button type="submit" className="btn btn-primary">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div >
          </div >
        </>
    )
}
export default NewRoom;
