import React, { useEffect, useMemo, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function Songoverview() {
  const currentUser = null; // ingelogde gebruiker

  const [songs, setSongs] = useState([]); // alle nummers
  const [loading, setLoading] = useState(true); // laadstatus
  const [currentPage, setCurrentPage] = useState(1); // huidige pagina
  const [searchTerm, setSearchTerm] = useState(""); // zoekterm
  const itemsPerPage = 15; // hoeveel nummers per pagina

    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/songpage", {
            state: { from: location }
        });
    }

  // haal nummers op bij het laden
  useEffect(() => {
    fetch("https://localhost:7003/api/GetSongs")
      .then(res => {
        if (!res.ok) {
          throw new Error("fout bij ophalen nummers");
        }
        return res.json();
      })
      .then(data => {
        setSongs(data); // zet nummers in state
        setLoading(false); // stop loading
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // filter nummers op titel of artiest
  const filteredSongs = useMemo(() => {
    return songs.filter(song =>
      song.titel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);

  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage); // bereken totaal pagina's

  // pak alleen de nummers van de huidige pagina
  const paginatedSongs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSongs.slice(start, start + itemsPerPage);
  }, [currentPage, filteredSongs]);

  if (loading) {
    return <div className="text-center mt-5">Nummers laden...</div>; // laat loading zien
  }

  return (
    <div className="container mt-4">

      {/* header + zoekveld */}
      <div className="card shadow p-3 border-0 mb-4">
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-vinyl fs-3 text-danger me-2"></i>
          <h1 className="text-danger fs-5 mb-0">Alle nummers</h1>
        </div>

        <p className="text-muted mb-2">{filteredSongs.length} Nummers gevonden</p>

        <input
          type="text"
          className="form-control"
          placeholder="Zoek op titel of artiest..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); // update zoekterm
            setCurrentPage(1); // ga terug naar eerste pagina bij nieuwe zoekterm
          }}
        />
      </div>

      {/* tabel met nummers */}
      <div className="card shadow border-0 mb-4">
        <div className="table-responsive">
          <table className="table table-hover table-borderless mb-0">
            <thead className="bg-light border-0">
              <tr>
                <th>Titel</th>
                <th>Artiest</th>
                <th>Jaar</th>
                <th>Noteringen</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSongs.map(song => (
                <tr onClick={handleClick} key={song.songId}>
                  <td>
                      <Link to="/songpage" state={{ song }} className="nav-link text-white">
                      {song.titel}
                    </Link>
                  </td>
                  <td>{song.artist?.name}</td>
                  <td>{song.releaseYear}</td>
                  <td>
                    <i
                      className="bi bi-plus-lg text-danger fs-5"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#playlistModal"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* paginatie knoppen */}
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-danger text-white me-2"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} // vorige pagina
          disabled={currentPage === 1}
        >
          Vorige
        </button>

        <span className="align-self-center">
          Pagina {currentPage} van {totalPages || 1}
        </span>

        <button
          className="btn btn-danger text-white ms-2"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} // volgende pagina
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Volgende
        </button>
      </div>

      {/* modal voor toevoegen aan playlist */}
      <div className="modal fade" tabIndex={-1} id="playlistModal">
        <div className="modal-dialog">
          <div className="modal-content shadow border-0">
            <div className="modal-header border-0">
              <h5 className="modal-title text-danger">
                {currentUser ? "toevoegen aan afspeellijst" : "inloggen vereist"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {!currentUser ? (
                <p>
                  Je moet eerst ingelogd zijn voor je een nummer toe kan voegen aan een afspeellijst
                </p>
              ) : (
                <>
                  <label className="form-label">selecteer afspeellijst</label>
                  <select className="form-select mb-3">
                    <option>-- Kies een afspeellijst --</option>
                  </select>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
