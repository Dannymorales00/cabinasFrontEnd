
const EditInfoContact = ({ infoContact, handleInputChangeInfoContact}) => {
  return (
    <div className="container">
      <div>
        <div className="mb-3">
          <label className="form-label text-dark">Correo:</label>
          <input
            type="email"
            name="correo"
            value={infoContact.correo}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            maxLength={50}
            required

          />
        </div>
        <div className="mb-3">
          <label className="form-label text-dark">Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={infoContact.direccion}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            maxLength={120}
            required

          />
        </div>
        <div className="mb-3">
          <label className="form-label text-dark">Teléfono 1:</label>
          <input
            type="text"
            name="telefono1"
            value={infoContact.telefono1}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            maxLength={10}
            required

          />
        </div>
        <div className="mb-3">
          <label className="form-label text-dark">Teléfono 2 (opcional):</label>
          <input
            type="text"
            name="telefono2"
            value={infoContact.telefono2}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            maxLength={10}
 

          />
        </div>
        <div className="mb-3">
          <label className="form-label text-dark">URL WhatsApp:</label>
          <input
            type="text"
            name="urlWhatsApp"
            value={infoContact.urlWhatsApp}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            required
          />
        </div>

      </div>
    </div>
  );
};

export default EditInfoContact;
