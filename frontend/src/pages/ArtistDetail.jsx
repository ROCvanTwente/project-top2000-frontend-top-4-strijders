import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ArtistDetail() {
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://localhost:7003/api/GetArtists/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Artist not found");
                return res.json();
            })
            .then(data => setArtist(data))
            .catch(err => console.error(err));
    }, [id]);

    useEffect(() => {
        fetch(`https://localhost:7003/api/GetSongs/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Songs not found");
                return res.json();
            })
            .then(data => setSongs(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!artist) {
        return (
            <div className="container-lg mt-4">
                <p>Loading artist...</p>
            </div>
        );
    }

    return (
        <div className="container-lg mt-4">
            <div className="card shadow rounded border-0">
                <div className="row align-items-center">

                    <div className="col-12 col-md-4">
                        <img
                            className="img-fluid rounded"
                            src={
                                artist.photo ||
                                "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                            }
                            alt={artist.name}
                            style={{ height: "200px", objectFit: "cover", width: "100%" }}
                        />
                    </div>

                    <div className="col-12 col-md-8">
                        <p className="mb-1 fw-bold">{artist.name}</p>
                        {artist.biography ? (
                            <p className="card-text">{artist.biography}</p>
                        ) : (
                            <p className="card-text">{artist.name} heeft geen biografie</p>
                        )}

                        <div className="d-flex gap-2">
                            <a href={artist.wiki} target="_blank" rel="noopener noreferrer">
                                <button className="btn" style={{ backgroundColor: "#F3F4F6" }} disabled={!artist.wiki}>Wikipedia</button>
                            </a>
                            <a href={artist.websiteUrl} target="_blank" rel="noopener noreferrer">
                                <button className="btn" style={{ backgroundColor: "#F3F4F6" }} disabled={!artist.websiteUrl}>Website</button>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* songs list */}
            <div className="col-12 pt-3">
                <div className="card shadow border-0">
                    <div className="card-body">

                        {/* Header */}
                        <div className="d-flex align-items-center mb-3">
                            <span className="me-2"><i class="bi icons-standard bi-music-note-beamed"></i></span>
                            <h5 className="mb-0 text-danger">Nummers in de TOP 2000</h5>
                        </div>

                        {/* Songs */}
                        {songs.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-between align-items-center bg-light rounded p-3 mb-3"
                            >
                                {/* Left */}
                                <div>
                                    <div className="fw-semibold">
                                        <Link
                                            className="text-decoration-none overview-hover"
                                            to="/songpage"
                                            state={{ item }}
                                        >
                                            {item.titel}
                                        </Link>
                                    </div>
                                    <div className="text-muted small">
                                        Uitgave: {item.releaseYear}
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="text-end">
                                    <div className="text-danger fw-semibold">
                                        {item.position} jaar
                                    </div>
                                    <div className="text-muted small">
                                        genoteerd
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </div>
    );
}
