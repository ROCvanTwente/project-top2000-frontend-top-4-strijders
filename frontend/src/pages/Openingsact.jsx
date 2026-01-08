import React from 'react'
import { Link } from 'react-router-dom';

import OpeningsactImage from '../assets/openingsact.jpg';

export default function Openingsact() {

    return (
        <>
            <div className="container-lg pt-4">
                <div className="card shadow rounded border-0 mb-4">
                    <div className="card-body">
                        <div className="row align-items-stretch">
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <img
                                    src={OpeningsactImage}
                                    alt="showImg"
                                    className="img-fluid w-100 h-100 object-fit-cover rounded act-img"
                                />

                            </div >

                            <div className="col-12 col-md-8">
                                <h5 className="fw-semibold mb-1 figma-red-text"><span>
                                    <i class="bi icons-standard bi-music-note"></i>
                                    Openingsshow Top 2000
                                </span></h5>
                                <p className="text-muted mb-2 ms-2 figma-red-text">Editie 2025</p>

                                <div className="ms-2">
                                    <p>
                                        De 27e editie van de legendarische NPO Radio 2 Top 2000 wordt feestelijk afgetrapt met een spectaculaire
                                        openingsshow. Hoe je de opnames kunt bijwonen en wat je kunt verwachten, lees je hieronder.
                                    </p>

                                    <p className="fw-semibold mb-1 mt-3">De openingsshow</p>

                                    <p>
                                        NPO Radio 2 pakt dit jaar opnieuw groots uit met een wervelende show van één uur, gevuld met liveoptredens
                                        van topartiesten.
                                    </p>

                                    <p className="fw-semibold mb-1 mt-3">Artiesten in de show:</p>
                                    <ul className="list-unstyled">
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Guus Meeuwis
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Rondé
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            DeWolff
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Douwe Bob
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            The Indien
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Floor Jansen
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Sanne Hans
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Zoë Livay
                                        </li>
                                        <li className="d-flex align-items-center mb-1">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Claudia de Breij
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="bi bi-arrow-right-short me-2"></i>
                                            Eloi Youssef
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-12 mb-4 rounded ">
                        <div className="card shadow red-gradient border-0">
                            <p className='card-body card-text text-white mb-0 fw-semibold pb-0'>De uitzending</p>
                            <p className="card-body card-text text-white">
                                De TOP 2000 is een jaarlijkse muzieklijst van NPO Radio 2, samengesteld op basis van stemmen van luisteraars.
                                Tussen Kerstmis en Oudjaarsdag worden de 2000 populairste nummers aller tijden uitgezonden.
                                Ontdek de grootste hits, stem op je favorieten en maak je eigen afspeellijsten!
                            </p>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-12 col-lg-6 mb-4">
                        <div className="card shadow border-0 p-2">
                            <div className="card-header border-0 bg-white figma-red-text">
                                <span>
                                    Welkom bij de Openingsact 2025
                                </span>
                            </div>
                            <div className="card-body">
                                <p className="card-text mb-1">
                                    De Top 2000 van 2025 gaat van start met een spectaculaire openingsact.
                                    Een unieke liveshow waarin muziek, emotie en beleving samenkomen
                                    om het startsein te geven voor zes dagen non-stop Top 2000.
                                </p>
                                <p className="card-text ">
                                    Verwacht iconische nummers, bijzondere samenwerkingen en een onvergetelijk openingsmoment.
                                    Samen met bekende artiesten en een livepubliek wordt de sfeer gezet voor een muzikale reis door de geschiedenis.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-4">
                        <div className="card shadow border-0 p-2">
                            <div className="card-header border-0 bg-white figma-red-text">
                                <span>Planning Openingsact 2024</span>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Datum:</span>
                                    <span>24 december 2025</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Tijd:</span>
                                    <span>23:00 - 00:00</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Zender:</span>
                                    <span>NPO Radio 2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

