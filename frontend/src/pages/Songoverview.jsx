import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Songoverview() {
  const currentUser = null;

  // Dummy songs-array
  const songs = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    title: `Song Titel ${i + 1}`,
    artist: `Artiest ${i + 1}`,
    year: 2000 + (i % 20),
    yearsInRanking: (i % 5) + 1
  }));

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(songs.length / itemsPerPage);

  const paginatedSongs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return songs.slice(start, end);
  }, [currentPage, songs]);

  return (
    <div className="container mt-4">

      {/* Header / Zoekveld */}
      <div className="card shadow p-3 border-0 mb-4">
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-vinyl fs-3 text-danger me-2"></i>
          <h1 className="text-danger fs-5 mb-0">Alle Nummers</h1>
        </div>
        <div className="mb-3">
          <label className="form-label fs-6">Zoek nummer</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search text-danger"></i>
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Zoek op titel of artiest..."
            />
          </div>
        </div>
        <p className="text-muted mb-0">{songs.length} nummers gevonden</p>
      </div>

      {/* Tabel */}
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
                <tr key={song.id} className="shadow-sm rounded mb-2">
                  <td>
                    <Link to="#" className="text-decoration-none d-flex align-items-center">
                      {song.title}
                    </Link>
                  </td>
                  <td>{song.artist}</td>
                  <td>{song.year}</td>
                  <td>
                    <span className="badge bg-light me-2 text-danger">{song.yearsInRanking} jaar</span>
                    <i
                      className="bi bi-plus-lg text-danger ms-2 fs-5"
                      style={{ cursor: 'pointer' }}
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

      {/* Pagination */}
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-danger text-white me-2"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Vorige
        </button>
        <span className="align-self-center">Pagina {currentPage} van {totalPages}</span>
        <button
          className="btn btn-danger text-white ms-2"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Volgende
        </button>
      </div>

      {/* popup */}
      <div className="modal fade" tabIndex={-1} id="playlistModal">
        <div className="modal-dialog">
          <div className="modal-content shadow border-0">
            <div className="modal-header border-0">
              <h5 className="modal-title text-danger">
                {currentUser ? "Toevoegen aan afspeellijst" : "Inloggen vereist"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!currentUser ? (
                <p>Je moet eerst ingelogd zijn voor je een nummer toe kan voegen aan een afspeellijst.</p>
              ) : (
                <>
                  <label className="form-label">Selecteer afspeellijst</label>
                  <select className="form-select mb-3" defaultValue="0">
                    <option value="0">-- Kies een afspeellijst --</option>
                    <option value="1">Favorieten</option>
                    <option value="-1">+ Nieuwe afspeellijst maken</option>
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Naam nieuwe afspeellijst"
                  />
                </>
              )}
            </div>
            {currentUser && (
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuleren</button>
                <button type="button" className="btn btn-danger">Toevoegen</button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
