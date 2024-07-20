import React, { useContext } from "react";
import ContactCard from "../component/contactCard.jsx";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEditContact = (id) => {
        navigate(`/editContact/${id}`);
    };

    const handleDeleteContact = async (id) => {
        try {
            await actions.deleteContact(id);
            actions.getContactList();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center">Contact List</h1>
            {store.contactList.length === 0 ? (
                <p className="text-center">No contacts found.</p>
            ) : (
                <div className="row">
                    {store.contactList.map(contact => (
                        <div className="col-12 mb-4" key={contact.id}>
                            <ContactCard
                                name={contact.name}
                                email={contact.email}
                                phone={contact.phone}
                                address={contact.address}
                                id={contact.id}
                                onEditContact={() => handleEditContact(contact.id)} 
                                onDeleteContact={() => handleDeleteContact(contact.id)} 
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contact;