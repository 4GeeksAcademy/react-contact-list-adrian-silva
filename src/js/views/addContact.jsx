import React, { useContext, useState, useEffect } from "react";
import AddContactForm from "../component/addContactForm.jsx";
import { Context } from "../store/appContext.js";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
    const { actions, store } = useContext(Context);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [contactToEdit, setContactToEdit] = useState(null);

    useEffect(() => {
        if (id) {
            const contact = store.contactList.find((contact) => contact.id == id);
            if (contact) {
                setContactToEdit(contact);
            }
        }
    }, [id, store.contactList]);

    const handleSaveContact = async (contact) => {
        try {
            if (contactToEdit) {
                await actions.editContact(id, contact);
            } else {
                await actions.addContact(contact);
            }
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <AddContactForm onAddContact={handleSaveContact} />
        </div>
    );
};

export default AddContact;
