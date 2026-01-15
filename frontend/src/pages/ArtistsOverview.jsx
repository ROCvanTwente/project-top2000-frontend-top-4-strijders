import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ArtistsOverview() {
  const [artists, setArtists] = useState([]);
  const [searchArtist, setSearchArtist] = useState("");

  // Dummy songs-array
  const songs = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    title: `Song Titel ${i + 1}`,
    artist: `Artiest ${i + 1}`,
    year: 2000 + (i % 20),
    yearsInRanking: (i % 5) + 1
  }));

  useEffect(() => {
    fetch(`https://localhost:7003/api/getartists`)
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(err => console.error(err));
  }, []);

  console.log(artists);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(artists.length / itemsPerPage);

  const paginatedArtists = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return artists.slice(start, end);
  }, [currentPage, artists]);

  return (
    <div className="container-lg mt-4">

      {/* Header / Zoekveld */}
      <div className="card shadow p-3 border-0 mb-4">
        <div className="d-flex align-items-center mb-3">
          <i className="bi icons-standard bi-people-fill me-3" style={{ fontSize: "1.5rem" }}></i>
          <h1 className="text-danger fs-5 mb-0">Alle Artiesten</h1>
        </div>
        <div className="p-3">
          <p className="mb-2">Zoek een artiest</p>
          <input
            type="text"
            className="form-control"
            placeholder="Zoek een artiest..."
            value={searchArtist}
            onChange={(e) => setSearchArtist(e.target.value)}
          />
        </div>
        <p className="text-muted mb-0 ms-3">{artists.length} artiesten gevonden</p>
      </div>

      <div className="row g-4">
        {paginatedArtists.map((artist) => (
          <div key={artist.id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow rounded">
              <img
                className="card-img-top"
                src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                alt="Card image cap"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{artist.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                {artist.biography ? (
                  <p className="card-text">Biografie: {artist.biography}</p>
                ) : (
                  <p className="card-text">Deze artiest heeft geen biografie</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}