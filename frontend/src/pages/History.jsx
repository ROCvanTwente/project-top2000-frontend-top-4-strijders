import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';


export default function History() {
    return (
        <div className="container my-4">
            {/* Geschiedenis card */}
            <div className="card shadow mb-4">
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex align-items-center mb-4">
                        {/* <Calendar className="me-3 text-danger" size={32} /> */}
                        <h1 className="text-danger mb-0">
                            <span>
                                <i class="bi icons-standard bi-calendar-heart me-4"></i>
                                Geschiedenis van de TOP 2000
                            </span>

                        </h1>
                    </div>

                    <h2 className="text-dark">Het Begin</h2>
                    <p className="text-secondary lh-lg">
                        De TOP 2000 is een jaarlijkse muzieklijst van NPO Radio 2, waarin luisteraars hun favoriete nummers
                        aller tijden kunnen stemmen. De eerste editie vond plaats in 1999, toen het programma werd bedacht
                        als eenmalige millenniumviering. Door het enorme succes werd besloten de TOP 2000 elk jaar te herhalen.
                    </p>

                    <h2 className="text-dark mt-4">De Traditie</h2>
                    <p className="text-secondary lh-lg">
                        Sinds 1999 wordt de TOP 2000 elk jaar tussen Kerstmis en Oudjaarsdag uitgezonden op NPO Radio 2.
                        De uitzending begint traditioneel op eerste kerstdag om 08:00 uur met nummer 2000 en eindigt op
                        oudejaarsavond om exact middernacht met het nummer op positie 1.
                    </p>

                    <h2 className="text-dark mt-4">Bohemian Rhapsody</h2>
                    <p className="text-secondary lh-lg">
                        Sinds het begin van de TOP 2000 heeft "Bohemian Rhapsody" van Queen de eerste plaats veroverd in
                        maar liefst 18 edities. Dit iconische nummer uit 1975 is hiermee het meest populaire nummer in de
                        geschiedenis van de TOP 2000 en wordt beschouwd als de absolute favoriet van de Nederlandse luisteraars.
                    </p>

                    <h2 className="text-dark mt-4">Stemmen</h2>
                    <p className="text-secondary lh-lg">
                        Elk jaar in november en december kunnen luisteraars hun favoriete nummers indienen. Er kunnen tot
                        35 nummers per persoon worden gestemd. De TOP 2000 is daarmee een echte volkslijst, waarbij de
                        luisteraars zelf bepalen welke muziek wordt gedraaid tijdens de feestdagen.
                    </p>

                    <h2 className="text-dark mt-4">Live vanuit Glazen Huis</h2>
                    <p className="text-secondary lh-lg">
                        Sinds 2004 wordt de TOP 2000 uitgezonden vanuit het Glazen Huis, een glazen studio op verschillende
                        locaties in Nederland. DJ's presenteren live vanuit dit glazen huis, vaak in het kader van het
                        jaarlijkse 3FM Serious Request (later NPO 3FM Serious Request) evenement.
                    </p>
                </div>
            </div>

            {/* Luister live card */}
            <div
                className="card figma-red shadow text-white"

            >
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex align-items-center mb-3">
                        <span className="d-flex align-items-center gap-2">
                            <i className="bi bi-broadcast"></i>
                            <h2 className="mb-0">Luister Live</h2>
                        </span>

                    </div>
                    <p className="lh-lg mb-0">
                        Stem elk jaar mee en luister tussen Kerstmis en Oud & Nieuw naar de TOP 2000 op NPO Radio 2,
                        online via NPO Radio 2 livestream, of via de NPO Radio app.
                    </p>
                </div>
            </div>
        </div>
    );
}
