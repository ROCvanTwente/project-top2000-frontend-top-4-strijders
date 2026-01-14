import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function FAQ() {
    return (
        <div className="container my-4">

            {/* Header */}
            <div className="card shadow mb-4">
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex align-items-center mb-3">
                        <i class="bi text-danger fs-2 me-2 bi-info-circle"></i>
                        <h1 className="text-danger mb-0">Veelgestelde vragen (FAQ)</h1>
                    </div>

                    <p className="text-secondary lh-lg">
                        Hieronder vind je antwoorden op de meest gestelde vragen over de TOP 2000.
                        Staat jouw vraag er niet tussen? Neem dan gerust contact met ons op.
                    </p>
                </div>
            </div>

            {/* FAQ Accordion */}
            <div className="card shadow">
                <div className="card-body p-4 p-md-5">
                    <div className="accordion" id="top2000Faq">

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq1"
                                >
                                    Wat is de TOP 2000?
                                </button>
                            </h2>
                            <div
                                id="faq1"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#top2000Faq"
                            >
                                <div className="accordion-body">
                                    De TOP 2000 is een jaarlijkse muzieklijst van NPO Radio 2,
                                    samengesteld door luisteraars. De lijst bevat de 2000
                                    populairste nummers aller tijden.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq2"
                                >
                                    Wanneer wordt de TOP 2000 uitgezonden?
                                </button>
                            </h2>
                            <div
                                id="faq2"
                                className="accordion-collapse collapse"
                                data-bs-parent="#top2000Faq"
                            >
                                <div className="accordion-body">
                                    De TOP 2000 wordt elk jaar uitgezonden van eerste kerstdag
                                    (25 december) tot en met oudejaarsavond op NPO Radio 2.
                                    De nummer 1 wordt precies om middernacht gedraaid.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq3"
                                >
                                    Hoe kan ik stemmen voor de TOP 2000?
                                </button>
                            </h2>
                            <div
                                id="faq3"
                                className="accordion-collapse collapse"
                                data-bs-parent="#top2000Faq"
                            >
                                <div className="accordion-body">
                                    Stemmen kan jaarlijks in november via de website van NPO Radio 2.
                                    Je mag maximaal 35 nummers kiezen die volgens jou in de TOP 2000
                                    thuishoren.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq4"
                                >
                                    Welk nummer staat het vaakst op nummer 1?
                                </button>
                            </h2>
                            <div
                                id="faq4"
                                className="accordion-collapse collapse"
                                data-bs-parent="#top2000Faq"
                            >
                                <div className="accordion-body">
                                    “Bohemian Rhapsody” van Queen staat het vaakst op nummer 1
                                    in de geschiedenis van de TOP 2000 en is uitgegroeid tot
                                    een echte klassieker onder de luisteraars.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq5"
                                >
                                    Waar kan ik de TOP 2000 luisteren?
                                </button>
                            </h2>
                            <div
                                id="faq5"
                                className="accordion-collapse collapse"
                                data-bs-parent="#top2000Faq"
                            >
                                <div className="accordion-body">
                                    Je kunt de TOP 2000 luisteren via NPO Radio 2 op de radio,
                                    via de livestream op de website van NPO Radio 2 of via
                                    de NPO Radio app.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
