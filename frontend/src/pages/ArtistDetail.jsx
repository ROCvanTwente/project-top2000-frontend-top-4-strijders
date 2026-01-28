import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

export default function ArtistDetail() {
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function FetchArtistAndSongs() {
            let resArtist = await fetch(`https://top2000backend.runasp.net/api/GetArtists/${id}`)
            let artist;
            if (resArtist.ok) {
                artist = await resArtist.json();
                setArtist(artist)
            } else throw new Error("Artist not found");

            let resSongs = await fetch(`https://top2000backend.runasp.net/api/GetSongs/artist/${id}/entriescount`);
            let songs;
            if (resSongs) {
                songs = await resSongs.json();
                let songsWithArtistData = songs.map(song => {
                        return {
                            ...song,
                            artist: artist
                        }
                    })
                    console.log(songsWithArtistData);//
                    setSongs(songsWithArtistData)
            } else throw new Error("Songs not found");
        }
        FetchArtistAndSongs();
    }, [id]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = Math.ceil(songs.length / itemsPerPage);

    const paginatedSongs = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return songs.slice(start, end);
    }, [currentPage, songs]);


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

                    <div className="col-12 col-md-8 p-4">
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
                            <span className="me-2"><i className="bi icons-standard bi-music-note-beamed"></i></span>
                            <h5 className="mb-0 text-danger">Nummers in de TOP 2000</h5>
                        </div>

                        {/* Songs */}
                        {paginatedSongs.map((item, index) => (
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
                                        {item.timesInTop2000} jaar
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
            {totalPages > 1 && (
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
            )}
        </div>
    );
}
