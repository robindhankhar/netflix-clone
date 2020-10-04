import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Nav() {
    const [show, handleShow] = useState([]);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav_logo" src="https://assets.brand.microsites.netflix.io/assets/1561c76e-b389-11e7-9274-06c476b5c346_cm_800w.png?v=40" alt="Netflix logo" />
            <img className="nav_avatar" src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Netflix avatar" />
        </div>
    )
}

export default Nav;