import { Mail, Phone, MapPin, Send } from "lucide-react";


export default function Contact() {
    return (
        <div className="container my-4">

            {/* Contact info */}
            <div className="card shadow mb-4">
                <div className="card-body p-4 p-md-5">
                    <h1 className="text-danger mb-4">Contact</h1>

                    <p className="text-secondary lh-lg mb-5">
                        Heb je vragen? Neem gerust contact op met ROC van Twente – locatie Hengelo
                        via onderstaande gegevens.
                    </p>

                    <div className="row g-4">
                        <div className="col-md-4 d-flex">
                            <div className="me-3 bg-danger bg-opacity-10 rounded-circle p-3">
                                <Mail className="text-danger" />
                            </div>
                            <div>
                                <h5>Email</h5>
                                <p className="text-secondary mb-0">
                                    info@rocvantwente.nl
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4 d-flex">
                            <div className="me-3 bg-danger bg-opacity-10 rounded-circle p-3">
                                <Phone className="text-danger" />
                            </div>
                            <div>
                                <h5>Telefoon</h5>
                                <p className="text-secondary mb-0">
                                    088 - 336 7000
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4 d-flex">
                            <div className="me-3 bg-danger bg-opacity-10 rounded-circle p-3">
                                <MapPin className="text-danger" />
                            </div>
                            <div>
                                <h5>Adres</h5>
                                <p className="text-secondary mb-0">
                                    Gieterij 200<br />
                                    7553 VZ Hengelo
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulier (dummy) */}
            <div className="card shadow mb-4">
                <div className="card-body p-4 p-md-5">
                    <h2 className="text-danger mb-4">Stuur een bericht</h2>

                    <form method="post">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Naam</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Onderwerp</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Bericht</label>
                            <textarea className="form-control" rows="5"></textarea>
                        </div>

                        <button type="submit" className="btn btn-danger d-flex align-items-center gap-2">
                            <Send size={18} />
                            Verstuur bericht
                        </button>
                    </form>
                </div>
            </div>

            {/* FAQ */}
            <div className="bg-light rounded p-4">
                <h4>Veelgestelde vragen</h4>
                <p className="text-secondary mb-0">
                    Voor veelgestelde vragen kun je ook onze{" "}
                    <a href="/faq" className="text-danger fw-semibold text-decoration-none">
                        FAQ-sectie
                    </a>
                        . Daar vind je antwoorden op de meest gestelde vragen over de TOP 2000,
                        het stemproces en de uitzending.
                </p>

            </div>

        </div>
    );
}
