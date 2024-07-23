import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AddContactForm = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [contactToEdit, setContactToEdit] = useState(null);

    useEffect(() => {
        if (id) {
            const contact = store.contactList.find((contact) => contact.id == id);
            if (contact) {
                setContactToEdit(contact);
                setName(contact.name || ""); // Update the field names here
                setEmail(contact.email || "");
                setPhone(contact.phone || "");
                setAddress(contact.address || "");
            }
        }
    }, [id, store.contactList]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "address":
                setAddress(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedContact = {
            name,
            email,
            phone,
            address,
        };

        try {
            if (contactToEdit) {
                await actions.editContact(contactToEdit.id, updatedContact);
                setSuccessMessage("Contact updated successfully");
            } else {
                await actions.addContact(updatedContact);
                setSuccessMessage("Contact added successfully");
                setName("");
                setEmail("");
                setPhone("");
                setAddress("");
            }
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    const handleBackToHome = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="container mt-3" style={{ maxWidth: '600px' }}>
            <h1 className="text-center">{contactToEdit ? "Edit Contact" : "Add a new contact"}</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">
                    {contactToEdit ? "Update Contact" : "Save Contact"}
                </button>
            </form>
            <a href="/" onClick={handleBackToHome} className="d-block text-center mt-3">
                Back to Contacts list
            </a>
        </div>
    );
};

export default AddContactForm;
