import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function AdminPage() {
    return (
        <>
            <div className="container-lg pt-4">
                <div className='row g-4'>

                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card shadow border-0 p-2">
                                <div className="card-header border-0 bg-white figma-red-text">
                                    
                                    <span>
                                        <i class="bi icons-standard bi-shield"></i>
                                        Admin Dashboard
                                    </span>
                                </div>
                                <div className="card-body py-2">
                                    <p className="card-text pe-2">
                                        Welkom in het beheergedeelte. Hier kun je informatie over artiesten en nummers aanpassen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Artiesten */}
                        <div className="col-12 col-sm-6">
                            <Link to="/adminartists" className="text-decoration-none">
                                <div className="card shadow admin-shadow-hover border-0 p-2">
                                    <div className="card-header admin-header border-0 bg-white figma-red-text">
                                        <div className="icon-circle">
                                            <i class="bi icons-standard bi-people"></i>
                                        </div>
                                        <span> Artiest beheer</span>
                                    </div>
                                    <div className="card-body py-2">
                                        <p className="card-text pe-2">
                                            Voeg biografieën, foto's en links toe voor artiestprofielen
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Nummers */}
                        <div className="col-12 col-sm-6">
                            <Link to="/adminsongs" className="text-decoration-none">
                                <div className="card shadow admin-shadow-hover border-0 p-2">
                                    <div className="card-header admin-header border-0 bg-white figma-red-text">
                                        <div className="icon-circle">
                                            <i class="bi icons-standard bi-music-note-beamed"></i>
                                        </div>
                                        <span> Nummers beheer</span>
                                    </div>
                                    <div className="card-body py-2">
                                        <p className="card-text pe-2">
                                            Voeg songteksten, albumhoezen en Youtube links toe
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}