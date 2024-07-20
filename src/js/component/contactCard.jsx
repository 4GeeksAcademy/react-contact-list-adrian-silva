import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ name, email, phone, address, id }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEditContact = () => {
        navigate(`/editContact/${id}`);
    };

    const handleDeleteContact = async () => {
        try {
            await actions.deleteContact(id);
            actions.getContactList();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="card mb-3 position-relative">
            {/* Botones Editar y Eliminar */}
            <div className="position-absolute top-0 end-0 p-2 d-flex align-items-start">
                <button
                    type="button"
                    className="btn btn-link text-dark me-2 p-0"
                    onClick={handleEditContact}
                    title="Edit"
                >
                    <i className="fas fa-pencil-alt fa-lg"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-link text-dark p-0"
                    onClick={handleDeleteContact}
                    title="Delete"
                >
                    <i className="fas fa-trash-alt fa-lg"></i>
                </button>
            </div>
            <div className="row g-0">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <img
                        src="https://picsum.photos/200"
                        className="img-fluid rounded-circle"
                        alt="Profile"
                    />
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h4 className="card-title">{name}</h4>
                        <p className="card-text">
                            <i className="fas fa-map-marker-alt me-2"></i>{address}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-phone me-2"></i>{phone}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-envelope me-2"></i>{email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;