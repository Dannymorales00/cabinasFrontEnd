
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios/configAxios';
import NewPassword from '../components/NewPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material';


const ResetPassword = () => {
  const [Correo, setCorreo] = useState("");
  const [SendCorreo, setSendCorreo] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Correo) {
      setIsLoading(true);
      const data = {
        correo: Correo
      }
      axios.post('users/forgotPassword', data)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            toast.info(res.data.msg);
            setSendCorreo(Correo)
          }
        })
        .catch(error => {
          //error end point
          if (error.response.status === 404) {
            return toast.info(error.response.data.msg);
          }
          //error de esquemas de validacion
          if (error.response.status === 400) {
            return toast.info(error.response.data.details.error_message[0].msg);
          }
          console.log(error)
        }).finally(() => {
          setIsLoading(false);
        })
    } else {
      toast.info('debe ingresar un correo electronico')
    }
  }
  const handleInputChange = (text) => { setCorreo(text) }

  const handleClear = () => {
    setSendCorreo(null);
  }
  const handleGoBack = () => {
    navigate("/login");
  }
  return (
    <>
      <ToastContainer theme="light" position="bottom-right" />
      {(!SendCorreo) &&
        <div className="container" style={{ marginTop: '6%' }}>
          <div className="row justify-content-center">
            <div className="col col-12 col-sm-10 col-lg-5 col-xl-5  align-self-center">
              <div className="mb-4 mt-4">
                <button type="button" id="btnGoBack" onClick={() => { handleGoBack() }} className="btn btn-secondary">
                  <span className="fa fa-arrow-left" />
                </button>
              </div>
              <form onSubmit={handleSubmit} name="signupForm" id="signupForm">

                <div className="card" >
                  <div className="card-header h5 text-white bg-danger text-center">Restablecer contraseña</div>
                  <div className="card-body px-5">
                    <div className="text-center my-1">
                      <span className="fa fa-lock fa-5x fa-fade" />
                    </div>
                    <p className="card-text py-2" style={{ textAlign: 'left' }}>
                      Ingresa un correo electronico, donde se enviara las intrucciones para la recuperación de la contraseña.
                    </p>
                    <div className="form-outline">

                      <div className="input-group mb-3">
                        <span className="input-group-text"><span className="fa fa-envelope fa-fade" /></span>
                        <input onChange={(e) => handleInputChange(e.target.value)}
                          value={Correo}
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          maxLength={50}
                          required
                          style={{ height: 40 }}
                        />
                      </div>
                      <label htmlFor="email" style={{ textAlign: 'left' }}>Ingrese el correo electrónico</label>

                    </div>

                    <div className="d-flex justify-content-end mt-3">
                      {!IsLoading ?
                        <button type="Submit" id="submitButton" className="btn btn-secondary"> Siguiente
                        </button>
                        : <Spinner style={{ margin: "auto" }} visible={IsLoading} color="Red" />
                      }
                    </div>

                  </div>
                </div>






              </form>

            </div>
          </div>

        </div>
      }

      {SendCorreo &&
        <NewPassword correo={SendCorreo} handle={handleClear} />
      }
    </>
  );
}

export default ResetPassword