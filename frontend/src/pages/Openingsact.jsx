import React from 'react'
import { Link } from 'react-router-dom';

import OpeningsactImage from '../assets/openingsact.jpg';

export default function Openingsact() {

    return (
        <>
            <div className="container-lg pt-4 ">
                <div className="row shadow rounded mb-4">
                    <div className="col-4">
                        <img src={OpeningsactImage} alt='showImg' className="img-fluid w-100"></img>
                    </div>

                    <div className="col-8">
                        <h4>Openingsshow Top 2000 - 2024</h4>

                        <p>
                            De 27e editie van de legendarische NPO Radio 2 Top 2000 wordt feestelijk afgetrapt met een spectaculaire
                            openingsshow. Hoe je de opnames kunt bijwonen en wat je kunt verwachten, lees je hieronder.
                        </p>

                        <h4>De Openingsshow</h4>

                        <p>
                            NPO Radio 2 pakt dit jaar opnieuw groots uit met een wervelende show van één uur, gevuld met liveoptredens
                            van topartiesten. Tijdens deze muzikale avond bouwen tien bekende Nederlandse acts samen op naar het officiële
                            begin van de Top 2000.
                        </p>

                        <h5>Artiesten in de show:</h5>
                        <ul>
                            <li>Guus Meeuwis</li>
                            <li>Rondé</li>
                            <li>DeWolff</li>
                            <li>Douwe Bob</li>
                            <li>The Indien</li>
                            <li>Floor Jansen</li>
                            <li>Sanne Hans</li>
                            <li>Zoë Livay</li>
                            <li>Claudia de Breij</li>
                            <li>Eloi Youssef</li>
                        </ul>

                        <p>
                            Verwacht indrukwekkende covers, verrassende samenwerkingen en uiteraard de unieke sfeer waarmee de
                            Top 2000 elk jaar van start gaat.
                        </p>
                    </div>
                </div>


                <div className="row">
                    <div className="col-12 mb-4 rounded ">
                        <div className="card shadow red-gradient border-0">
                            <p className='card-body card-text text-white mb-0 fw-bold pb-0'>De uitzending</p>
                            <p className="card-body card-text text-white">
                                De TOP 2000 is een jaarlijkse muzieklijst van NPO Radio 2, samengesteld op basis van stemmen van luisteraars.
                                Tussen Kerstmis en Oudjaarsdag worden de 2000 populairste nummers aller tijden uitgezonden.
                                Ontdek de grootste hits, stem op je favorieten en maak je eigen afspeellijsten!
                            </p>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-6 mb-4">
                        <p>test</p>
                    </div>
                    <div className="col-6 mb-4">
                        <p>test</p>
                    </div>
                </div>
            </div>
        </>
    )
}

