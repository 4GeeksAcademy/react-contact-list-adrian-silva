import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import Contact from "./views/contact.jsx";
import injectContext from "./store/appContext.js";
import Navbar from "./component/navbar.js";
import { Footer } from "./component/footer";
import AddContactForm from "./component/addContactForm.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Contact />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/addContact" element={<AddContactForm />} />
                        <Route path="/editContact/:id" element={<AddContactForm />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
