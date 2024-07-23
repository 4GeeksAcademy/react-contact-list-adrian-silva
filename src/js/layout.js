import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import Contact from "./views/contact.jsx";
import injectContext from "./store/appContext.js";
import Navbar from "./component/navbar.js";
import { Footer } from "./component/footer";
import AddContact from "./views/addContact.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <ScrollToTop>
                <Navbar />
                <Routes basename={basename}>
                    <Route path="/" element={<Contact />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/addContact" element={<AddContact />} />
                    <Route path="/editContact/:id" element={<AddContact />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </ScrollToTop>
        </div>
    );
};

export default injectContext(Layout);
