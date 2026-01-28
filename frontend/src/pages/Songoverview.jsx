import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Songoverview() {
  const currentUser = null;

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetch("https://localhost:5001/api/GetSongs") // poort aanpassen?
      .then(res => {
        if (!res.ok) {
          throw new Error("Fout bij ophalen nummers");
        }
        return res.json();
      })
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(songs.length / itemsPerPage);

  const paginatedSongs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return songs.slice(start, start + itemsPerPage);
  }, [currentPage, songs]);

  if (loading) {
    return <div className="text-center mt-5">Nummers laden...</div>;
  }

  return (
    <div className="container mt-4">

      {/* Header / Zoekveld */}
      <div className="card shadow p-3 border-0 mb-4">
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-vinyl fs-3 text-danger me-2"></i>
          <h1 className="text-danger fs-5 mb-0">Alle Nummers</h1>
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
                <tr key={song.songId}>
                  <td>
                    <Link to="#" className="text-decoration-none">
                      {song.titel}
                    </Link>
                  </td>
                  <td>{song.artist?.name}</td>
                  <td>{song.releaseYear}</td>
                  <td>
                    <span className="badge bg-light text-danger">–</span>
                    <i
                      className="bi bi-plus-lg text-danger ms-2 fs-5"
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

      {/* Pagination */}
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-danger text-white me-2"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Vorige
        </button>

        <span className="align-self-center">
          Pagina {currentPage} van {totalPages}
        </span>

        <button
          className="btn btn-danger text-white ms-2"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Volgende
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" tabIndex={-1} id="playlistModal">
        <div className="modal-dialog">
          <div className="modal-content shadow border-0">
            <div className="modal-header border-0">
              <h5 className="modal-title text-danger">
                {currentUser ? "Toevoegen aan afspeellijst" : "Inloggen vereist"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {!currentUser ? (
                <p>
                  Je moet eerst ingelogd zijn voor je een nummer toe kan voegen aan
                  een afspeellijst.
                </p>
              ) : (
                <>
                  <label className="form-label">Selecteer afspeellijst</label>
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
