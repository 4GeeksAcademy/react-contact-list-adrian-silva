import React, { useEffect, useState } from "react";

const AddContactForm = ({ onAddContact, contactToEdit }) => {
    //defino el estado para cada input
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //utilizo useEffect para actualizar el estado si hay un contacto para editar
    useEffect(() => {
        if (contactToEdit) {
            setFullName(contactToEdit.fullName || "");
            setEmail(contactToEdit.email || "");
            setPhone(contactToEdit.phone || "");
            setAddress(contactToEdit.address || "");
        }
    }, [contactToEdit]);

    // Manejo los cambios en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case "fullName":
                setFullName(value);
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

    // Maneja el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedContact = {
            fullName,
            email,
            phone,
            address,
        };

        if (contactToEdit) {
            updatedContact.id = contactToEdit.id;
        }

        onAddContact(updatedContact);
        if (contactToEdit) {
            setSuccessMessage("Contact updated successfully");
        } else {
            setSuccessMessage("New contact added successfully:", newContact);
            //limpio los campos despues de añadir un nuevo contacto
            setFullName("");
            setEmail("");
            setPhone("");
            setAddress("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container" style={{ maxwidth: '600px' }}>
            <h1 class="text-center">{contactToEdit ? "Edit Contact" : "Add a new contact"}</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName" value={fullName} onChange={handleChange} placeholder="Full name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={handleChange} placeholder="Enter email" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phone" value={phone} onChange={handleChange} placeholder="Enter phone" />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" value={address} onChange={handleChange} placeholder="Enter address" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ "width": "-webkit-fill-available" }}>save</button>
            <p><a href="/contact">or get back to contacts</a></p>
        </form>
    );
};
export default AddContactForm;