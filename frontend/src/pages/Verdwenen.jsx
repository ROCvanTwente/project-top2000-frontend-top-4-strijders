import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Verdwenen() {
  const [year, setYear] = useState(2024);
  const [verdwenen, setVerdwenen] = useState([]);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    setLoading(true);

    fetch(`/api/Statistieken/GetDisappearedSongs?year=${year}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Fout bij ophalen van verdwenen nummers");
        }
        return res.json();
      })
      .then(data => setVerdwenen(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [year]);

  const visibleVerdwenen = verdwenen.slice(0, ITEMS_PER_PAGE);

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="card shadow p-3 border-0 mb-4">
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-x-circle fs-3 text-danger me-2"></i>
          <h1 className="text-danger fs-5 mb-0">
            Verdwenen nummers – {year}
          </h1>
        </div>

        {/* Jaar selector */}
        <div className="mb-3">
          <label className="form-label fs-6">Selecteer jaar</label>
          <select
            className="form-select"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <p className="text-muted mb-0">
          {verdwenen.length} nummers verdwenen
        </p>
      </div>

      {/* Tabel */}
      <div className="card shadow border-0">
        <div className="table-responsive">
          <table className="table table-hover table-borderless mb-0">
            <thead className="bg-light">
              <tr>
                <th>Titel</th>
                <th>Artiest</th>
                <th>Jaar</th>
                <th>Laatste positie</th>
              </tr>
            </thead>
            <tbody>

              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Laden...
                  </td>
                </tr>
              )}

              {!loading && visibleVerdwenen.map(song => (
                <tr key={song.songId}>
                  <td>
                    <Link to="#" className="text-decoration-none">
                      {song.title}
                    </Link>
                  </td>
                  <td>{song.artistName}</td>
                  <td>{song.releaseYear}</td>
                  <td>
                    <span className="badge bg-light figma-red-text">
                      <i className="bi bi-dash-circle me-1"></i>
                      #{song.position}
                    </span>
                  </td>
                </tr>
              ))}

              {!loading && verdwenen.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Geen verdwenen nummers gevonden
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
