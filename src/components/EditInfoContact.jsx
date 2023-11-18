
const EditInfoContact = ({ infoContact, handleInputChangeInfoContact}) => {
  return (
    <div className="container">
      <div>
        <div className="mb-3">
          <label className="form-label">Correo:</label>
          <input
            type="text"
            name="correo"
            value={infoContact.correo}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            required

          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={infoContact.direccion}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            required

          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono 1:</label>
          <input
            type="text"
            name="telefono1"
            value={infoContact.telefono1}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            required

          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono 2:</label>
          <input
            type="text"
            name="telefono2"
            value={infoContact.telefono2}
            onChange={(e)=>handleInputChangeInfoContact(e)}
            className="form-control"
            required

          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL WhatsApp:</label>
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
