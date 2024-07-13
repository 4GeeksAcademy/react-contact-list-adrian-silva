import React from "react";

const ContactCard = ({ name, email, phone, address, id, onEditContact, onDeleteContact }) => {
    const handleEditContact = () => {
        onEditContact(id); // Llamo a la función de edición pasando el ID del contacto
    };

    const handleDeleteContact = () => {
        onDeleteContact(id); // Llamo a la función de eliminación pasando el ID del contacto
    };

    return (
         <div className="card mb-3 card w-100"> 
            <div className="row g-0">
                <div className="col-md-3">
                    <img
                        src="https://picsum.photos/200"
                        className="img-fluid rounded-circle"
                        alt="imagen"
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h4 className="card-title">Full Name</h4>
                        <h4 className="card-subtitle mb-2 text-muted">{name}</h4>
                        <h4 className="card-text">{email}</h4>
                        <p className="card-text">{phone}</p>
                        <p className="card-text">{address}</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                        <button type="button" className="btn btn-outline-primary mb-2" onClick={handleEditContact}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleDeleteContact}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
