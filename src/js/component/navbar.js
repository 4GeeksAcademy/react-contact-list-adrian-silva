import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    //utilizo para controlar que en caso que esté en la vista para agregar un Nuevo Contacto, 
    //no se muestre el Navbar con el botón, y así evitar redundancia
    const showNavbar = location.pathname !== '/addContact';

    return (
        <>
            {showNavbar && (
                <nav className="navbar navbar-light bg-light mb-3">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-end w-100">
                            <Link to="/addContact">
                                <button className="btn btn-primary">Add new Contact</button>
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navbar;