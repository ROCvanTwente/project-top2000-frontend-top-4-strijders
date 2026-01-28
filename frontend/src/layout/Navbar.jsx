import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import '../css/global.css';

import { useAuth } from '../context/AuthContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, isLoggedIn, user, IsAdmin } = useAuth();

    const closeMenu = () => setIsOpen(false);


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
                                <Link className="nav-link text-white" to="/Overview" onClick={closeMenu}>TOP2000</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/artiesten" onClick={closeMenu}>Artiesten</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/songoverview" onClick={closeMenu}>Nummers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/openingsact" onClick={closeMenu}>Openingsact</Link>
                            </li>

                            {/* DJ Dropdown */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    DJ's
                                </a>
                                <ul className="dropdown-menu">
                                    <a href="https://nl.wikipedia.org/wiki/Jeroen_van_Inkel" className="dropdown-item" target="_blank" rel="noopener noreferrer">Jeroen van Inkel</a>
                                    <a href="https://nl.wikipedia.org/wiki/Astrid_Joosten" className="dropdown-item" target="_blank" rel="noopener noreferrer">Astrid Joosten</a>
                                    <a href="https://nl.wikipedia.org/wiki/Wouter_van_der_Goes" className="dropdown-item" target="_blank" rel="noopener noreferrer">Wouter van der Goes</a>
                                    <a href="https://nl.wikipedia.org/wiki/Marlous_Pieters" className="dropdown-item" target="_blank" rel="noopener noreferrer">Marlous Pieters</a>
                                    <a href="https://nl.wikipedia.org/wiki/Leo_Blokhuis" className="dropdown-item" target="_blank" rel="noopener noreferrer">Leo Blokhuis</a>
                                    <a href="https://nl.wikipedia.org/wiki/Jan-Willem_Roodbeen" className="dropdown-item" target="_blank" rel="noopener noreferrer">Jan-Willem Roodbeen</a>
                                    <a href="https://nl.wikipedia.org/wiki/Rob_Stenders" className="dropdown-item" target="_blank" rel="noopener noreferrer">Rob Stenders</a>
                                    <a href="https://nl.wikipedia.org/wiki/Sander_de_Heer" className="dropdown-item" target="_blank" rel="noopener noreferrer">Sander de Heer</a>
                                    <a href="https://nl.wikipedia.org/wiki/Emmely_Reeuwijk" className="dropdown-item" target="_blank" rel="noopener noreferrer">Emmely Reeuwijk</a>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/geschiedenis" onClick={closeMenu}>Geschiedenis</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/playlists" onClick={closeMenu}>Afspeellijsten</Link>
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
                            {IsAdmin() && (
                                <li className='nav-item'>
                                    <Link className='nav-link text-white' to="/adminpage">Admin</Link>
                                </li>
                            )}
                            <hr className='w-100 text-white d-lg-none'></hr>
                            {/* Mobile Inloggen */}
                            <li className="nav-item d-lg-none mt-2 w-100">
                                {!isLoggedIn() ? (
                                    <Link to="/login" className="nav-link text-white text-center" onClick={closeMenu}>Inloggen</Link>
                                ) : (
                                    <div className="d-flex flex-column align-items-center">
                                        <p className='nav-link text-white m-0'><i class="bi bi-person me-2"></i>{JSON.parse(user)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"].split("@")[0]}</p>
                                        <button onClick={() => logout()} className='nav-link text-white'><i class="bi bi-box-arrow-in-right"></i>Uitloggen</button>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                    {/* Desktop Inloggen */}
                    {!isLoggedIn() ? (
                        <div className="d-none d-lg-block ms-auto">
                            <Link to="/login" className="nav-link text-white" onClick={closeMenu}>Inloggen</Link>
                        </div>
                    ) : (
                        <div className="d-none d-lg-flex flex-row ms-auto">
                            <p className='nav-link text-white m-0 me-2 me-xl-4 text-center'><i class="bi bi-person me-2"></i>{JSON.parse(user)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"].split("@")[0]}</p>
                            <button onClick={() => logout()} className='nav-link text-white'><i class="bi bi-box-arrow-in-right me-2"></i>Uitloggen</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;