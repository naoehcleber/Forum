import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("_id");
        navigate("/");
    };
    return (
        <nav className='navbar'>
            <h2>Forum</h2>
            <div className='navbarRight'>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </nav>
    );
};

export default Nav;