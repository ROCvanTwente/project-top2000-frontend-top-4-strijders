import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dalers() {
  const [year, setYear] = useState(2024); // geselecteerd jaar
  const [dalers, setDalers] = useState([]); // alle dalers
  const [loading, setLoading] = useState(true); // laadstatus

  const ITEMS_PER_PAGE = 15; // hoeveel items laten zien

  // haal dalers op bij het laden of bij jaar verandering
  useEffect(() => {
    setLoading(true); // start loading

    fetch(`http://top2000backend.runasp.net/api/Statistieken/Dalers?year=${year}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("fout bij ophalen van dalers");
        }
        return res.json();
      })
      .then(data => setDalers(data)) // zet data in state
      .catch(err => console.error(err))
      .finally(() => setLoading(false)); // stop loading
  }, [year]);

  const visibleDalers = dalers.slice(0, ITEMS_PER_PAGE); // pak alleen eerste pagina

  return (
    <div className="container mt-4">

      {/* header */}
      <div className="card shadow p-3 border-0 mb-4">
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-graph-down-arrow fs-3 text-danger me-2"></i>
          <h1 className="text-danger fs-5 mb-0">
            Grootste dalers – {year}
          </h1>
        </div>

        {/* jaar selector */}
        <div className="mb-3">
          <label className="form-label fs-6">Selecteer jaar</label>
          <select
            className="form-select"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))} // update jaar
          >
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map(y => (
              <option key={y} value={y}>{y}</option> // maak opties voor jaren
            ))}
          </select>
        </div>

        <p className="text-muted mb-0">
          {dalers.length} Nummers gedaald
        </p>
      </div>

      {/* tabel */}
      <div className="card shadow border-0">
        <div className="table-responsive">
          <table className="table table-hover table-borderless mb-0">
            <thead className="bg-light">
              <tr>
                <th>Titel</th>
                <th>Artiest</th>
                <th>Jaar</th>
                <th>Daling</th>
              </tr>
            </thead>
            <tbody>

              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Laden... {/* laat loading zien */}
                  </td>
                </tr>
              )}

              {!loading && visibleDalers.map(song => (
                <tr key={song.songId}>
                  <td>
                    <Link to="#" className="text-decoration-none overview-hover overview-hover-hover">
                      {song.title}
                    </Link>
                  </td>
                  <td>{song.artistName}</td>
                  <td>{song.releaseYear}</td>
                  <td>
                    <span className="badge bg-light figma-red-text">
                      <i className="bi bi-arrow-down me-1"></i>
                      {song.gedaald} {/* aantal plaatsen gedaald */}
                    </span>
                    <small className="text-muted ms-2">
                      ({song.positionYearBefore} → {song.position}) {/* positie vorig jaar naar positie nu */}
                    </small>
                  </td>
                </tr>
              ))}

              {!loading && dalers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Geen dalers gevonden
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
