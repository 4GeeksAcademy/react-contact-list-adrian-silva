import React, { useEffect, useContext } from "react";
import ContactCard from "../component/contactCard.jsx"; // Asegúrate del nombre correcto del archivo
import { Context } from "../store/appContext";

const Contact = ({ userName = "adrian-silva" }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (userName) {
            actions.getContactList(userName);
        }
    }, [actions, userName]);

    const handleEditContact = async (id) => {
        console.log(`Editando contacto con ID: ${id}`);
        const contactToEdit = store.contactList.find(contact => contact.id == id);
        try {
            await actions.editContact(userName, id, {
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                address: contactToEdit.address,
            });

            // Actualizo la lista de contactos después de la edición
            actions.getContactList(userName);
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleDeleteContact = async (id) => {
        // Implementación de eliminación de contacto
        console.log(`Eliminando contacto con ID: ${id}`);
        try {
            await actions.deleteContact(userName, id);
            // Actualizo la lista después de eliminación
            actions.getContactList(userName); 
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Contact List</h1>
            {store.contactList.length === 0 ? (
                <p className="text-center">No contacts found.</p>
            ) : (
                <div className="row">
                    {store.contactList.map(contact => (
                        <div className="col-md-4 mb-4" key={contact.id}>
                            <ContactCard
                                name={contact.name}
                                email={contact.email}
                                phone={contact.phone}
                                address={contact.address}
                                id={contact.id}
                                onEditContact={handleEditContact} // Pasar la función de edición
                                onDeleteContact={handleDeleteContact} // Pasar la función de eliminación
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contact;
