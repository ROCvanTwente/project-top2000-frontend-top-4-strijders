import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Contact() {
  // State voor formulier velden
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

//   submit handler en valideren
  const handleSubmit = (e) => {
    e.preventDefault();

    // checken of alle velden zijn ingevuld
    if (!name || !email || !subject || !message) {
      alert("Vul alstublieft alle velden in!");
      return;
    }

    alert("Bedankt voor uw bericht!");

    // velden leegmaken na submit
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="container my-4">
      {/* contactinformatie */}
      <div className="card shadow mb-4">
        <div className="card-body p-4 p-md-5">
          <h1 className="text-danger mb-4">Contact</h1>

          <p className="text-secondary lh-lg mb-5">
            Heb je vragen? Neem gerust contact op met ROC van Twente – locatie
            Hengelo via onderstaande gegevens.
          </p>

          <div className="row g-4">
            <div className="col-md-4 d-flex">
              <div className="me-3 bg-danger bg-opacity-10 rounded-circle p-4 d-inline-flex justify-content-center align-items-center">
                <i className="bi bi-envelope fs-3 text-danger"></i>
              </div>
              <div>
                <h5>Email</h5>
                <p className="text-secondary mb-0">info@rocvantwente.nl</p>
              </div>
            </div>

            <div className="col-md-4 d-flex">
              <div className="me-3 bg-danger bg-opacity-10 rounded-circle p-4 d-inline-flex justify-content-center align-items-center">
                <i className="bi bi-telephone fs-3 text-danger"></i>
              </div>
              <div>
                <h5>Telefoon</h5>
                <p className="text-secondary mb-0">088 - 336 7000</p>
              </div>
            </div>

            <div className="col-md-4 d-flex">
              <div className="me-3 bg-danger bg-opacity-10 rounded-circle p-4 d-inline-flex justify-content-center align-items-center">
                <i className="bi bi-pin-map fs-3 text-danger"></i>
              </div>
              <div>
                <h5>Adres</h5>
                <p className="text-secondary mb-0">
                  Gieterij 200
                  <br />
                  7553 VZ Hengelo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulier met validatie */}
      <div className="card shadow mb-4">
        <div className="card-body p-4 p-md-5">
          <h2 className="text-danger mb-4">Stuur een bericht</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Naam</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Onderwerp</label>
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Bericht</label>
              <textarea
                className="form-control"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-danger d-flex align-items-center gap-2"
            >
              <i className="bi bi-send"></i>
              Verstuur bericht
            </button>
          </form>
        </div>
      </div>

        {/* faq */}
      <div className="bg-light rounded p-4">
        <h4>Veelgestelde vragen</h4>
        <p className="text-secondary mb-0">
          Voor veelgestelde vragen kun je ook onze{" "}
          <Link
            to="/faq"
            className="text-danger fw-semibold text-decoration-none"
          >
            FAQ-sectie{" "}
          </Link>
          raadplegen. Daar vind je antwoorden op de meest gestelde vragen over
          de TOP 2000, het stemproces en de uitzending.
        </p>
      </div>
    </div>
  );
}
