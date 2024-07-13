import React, { useContext, useState } from "react";
import AddContactForm from "../component/addContactForm.jsx";
import { Context } from "../store/appContext.js";

const AddContact = () => {
    const { actions } = useContext(Context);
    const [error, setError] = useState(null);

    // Función para manejar la acción de guardar un nuevo contacto
    const addContact = async (newContact) => {
        const userName = "adrian-silva";
        try {
            await actions.addContact(newContact, userName);
            // Si no hay errores, establece redirect a true
            setRedirect(true);
        } catch (error) {
            // Si hay errores, establece el error en el estado
            setError(error.message);
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <AddContactForm onAddContact={addContact} />
        </div>
    );
};

export default AddContact;
