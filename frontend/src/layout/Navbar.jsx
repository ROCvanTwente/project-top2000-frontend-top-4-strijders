import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import '../css/global.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <header>
            <nav className="navbar navbar-expand-lg m-0 red-gradient justify-content-center">
                <div className="container-fluid d-flex align-items-center p-0 justify-content-between">

                    {/* Logo */}
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand d-flex align-items-center p-0" to="/">
                            <img src={logo} alt="Logo" style={{ height: "65px", width: "65px" }} />
                        </Link>
                    </div>

                    {/* Toggle Button */}
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
                    </button>

                    {/* Nav Items */}
                    <div className={`collapse navbar-collapse flex-grow-1 ${isOpen ? "show" : ""}`}>
                        <ul className="navbar-nav d-flex align-items-center justify-content-center w-100">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">TOP2000</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/about">Artiesten</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/services">Nummers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/contact">Openingsact</Link>
                            </li>

                            {/* DJ Dropdown */}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    DJ's
                                </Link>
                                <ul className="dropdown-menu">
                                    <Link to="/djs/jeroen-van-inkel" className="dropdown-item">Jeroen van Inkel</Link>
                                    <Link to="/djs/astrid-joosten" className="dropdown-item">Astrid Joosten</Link>
                                    <Link to="/djs/wouter-van-der-goes" className="dropdown-item">Wouter van der Goes</Link>
                                    <Link to="/djs/marlous-pieters" className="dropdown-item">Marlous Pieters</Link>
                                    <Link to="/djs/leo-blokhuis" className="dropdown-item">Leo Blokhuis</Link>
                                    <Link to="/djs/jan-willem-roodbeen" className="dropdown-item">Jan-Willem Roodbeen</Link>
                                    <Link to="/djs/rob-stenders" className="dropdown-item">Rob Stenders</Link>
                                    <Link to="/djs/sander-de-heer" className="dropdown-item">Sander de Heer</Link>
                                    <Link to="/djs/emmely-reeuwijk" className="dropdown-item">Emmely Reeuwijk</Link>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/contact">Geschiedenis</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/contact">Afspeellijsten</Link>
                            </li>

                            {/* Statistieken Dropdown */}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Statistieken
                                </Link>
                                <ul className="dropdown-menu">
                                    <Link to="/statistieken/top-artiesten" className="dropdown-item">Top artiesten per jaar TOP2000</Link>
                                    <Link to="/statistieken/een-vermelding" className="dropdown-item">Nummers met Éen vermelding TOP2000</Link>
                                    <Link to="/statistieken/aansluitende-posities" className="dropdown-item">Artiesten met aansluitende posities TOP2000</Link>
                                    <Link to="/statistieken/zelfde-positie" className="dropdown-item">Zelfde positie TOP2000</Link>
                                    <Link to="/statistieken/herintreders" className="dropdown-item">Herintreders TOP2000</Link>
                                    <Link to="/statistieken/verdwenen" className="dropdown-item">Verdwenen nummers TOP2000</Link>
                                    <Link to="/statistieken/hoogste-binnenkomers" className="dropdown-item">Hoogste Binnenkomers TOP2000</Link>
                                    <Link to="/statistieken/alle-liedjes" className="dropdown-item">Alle liedjes TOP2000</Link>
                                    <Link to="/statistieken/grootste-stijgers" className="dropdown-item">Grootste stijgers TOP2000</Link>
                                    <Link to="/statistieken/grootste-dalers" className="dropdown-item">Grootste dalers TOP2000</Link>
                                </ul>
                            </li>

                            {/* Mobile Inloggen */}
                            <li className="nav-item d-lg-none mt-2">
                                {!loggedIn ? (
                                    <Link to="/register" className="nav-link text-white">Inloggen</Link>
                                ) : (
                                    <Link to="/" className="nav-link text-white">Profielbeheer</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                    
                    {!loggedIn ? (
                        <div className="d-none d-lg-block ms-auto">
                            <Link to="/register" className="nav-link text-white">Inloggen</Link>
                        </div>
                    ) : (
                        <div className="d-none d-lg-block ms-auto">
                            {/* Desktop Inloggen */}
                            <Link to="/" className="nav-link text-white"><i class="bi icon-navbar bi-person-circle me-1"></i></Link>
                        </div>
                    )}

                </div>
            </nav>
        </header>
    );
}

export default Navbar;
