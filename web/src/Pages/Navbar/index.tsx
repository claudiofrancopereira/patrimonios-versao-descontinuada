import React from 'react';
import './navbar.css';

const Navbar = () => {
    return (
        <div className="header">
            <a href="/">Logo</a>

            <nav>
                <ul className="menu">
                    <li><a href="#home">Patrimonios</a></li>
                    <li><a href="#home">Ocorrencias</a></li>
                    <li><a href="#home">Login</a></li>
                </ul>

            </nav>

        </div>
    );
};

export default Navbar;
