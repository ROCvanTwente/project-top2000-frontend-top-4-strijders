import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

import useSearch from '../components/Searchfunction.jsx';


export default function ArtistsOverview() {
  const [artists, setArtists] = useState([]);
  const [searchArtist, setSearchArtist] = useState("");

  useEffect(() => {
    fetch(`https://localhost:7003/api/getartists`)
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(err => console.error(err));
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(artists.length / itemsPerPage);

  const paginatedArtists = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return artists.slice(start, end);
  }, [currentPage, artists]);

  const searchedEntries = useSearch(
    paginatedArtists,
    searchArtist,
    item => item.name
  );

  // Reset to first page on new search 
  useEffect(() => {
    setCurrentPage(1);
  }, [searchArtist]);


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
        <p className="text-muted mb-0 ms-3">{searchedEntries.length === 0 ? 'Geen' : searchedEntries.length} artiesten gevonden</p>
      </div>

      <div className="row g-4">
        {searchedEntries.map((artist) => (
          <div key={artist.artistId} className="col-12 col-md-6 col-lg-4">
            <Link
              to={`/artiest/${artist.artistId}`}
              className="text-decoration-none text-dark"
            >
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
            </Link>
          </div>
        ))}
      </div>
      <div className="row justify-content-center my-3">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow d-flex flex-row justify-content-center py-2">
            <button
              className="btn figma-red text-white me-2"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Vorige
            </button>

            <span className="align-self-center">
              Pagina {currentPage} van {totalPages}
            </span>

            <button
              className="btn figma-red text-white ms-2"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Volgende
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}