import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';

export default function OnceInTop2000() {
    const [songs, setSongs] = useState([]);
    const [sortBy, setSortBy] = useState("positie");
    const [year, setYear] = useState(2024);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;


    // Fetch filtered by year
    useEffect(() => {
        fetch(`http://top2000backend.runasp.net/api/Statistieken/GetSongsOnlyOnceOnTop2000`)
            .then(res => res.json())
            .then(data => setSongs(data))
            .catch(err => console.error('Data ophalen mislukt. Probeer het opnieuw'));
    }, [year]);


    // Reset to first page when year or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [year, sortBy]);


    const sortedSongs = useMemo(() => {
        const entries = [...songs];

        switch (sortBy) {
            case "titel":
                entries.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                break;

            case "artiest":
                entries.sort((a, b) =>
                    a.artistName.localeCompare(b.artistName)
                );
                break;

            case "jaar":
                entries.sort((a, b) => a.releaseYear - b.releaseYear);
                break;

            case "positie":
            default:
                entries.sort((a, b) => a.position - b.position);
                break;
        }

        return entries;
    }, [songs, sortBy]);


    // Pagination logic
    const paginatedSongs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedSongs.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedSongs, currentPage]);

    const totalPages = Math.ceil(sortedSongs.length / itemsPerPage);

    // Loading until fetched
    if (songs.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="container-lg  pt-4 ">

                {/*Filters*/}
                <div className="col-12">
                    <div className="card shadow border-0 p-2">
                        <div className="card-header border-0 bg-white figma-red-text">
                            Liedjes met enkele vermelding in de Top2000
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-lg-4">
                                    <div className=" p-3">
                                        <p className="mb-2 ms-1">Sorteer op</p>
                                        <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                            <option value="positie">Positie</option>
                                            <option value="titel">Titel</option>
                                            <option value="artiest">Artiest</option>
                                            <option value="jaar">Jaar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*table*/}
                <div className="col-12 pt-4">
                    <div className="card shadow border-0">
                        <div className="card-body p-0">
                            <table className="table table-hover table-top2000 mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Positie</th>
                                        <th scope="col">Titel</th>
                                        <th scope="col">Artiest</th>
                                        <th scope="col">Jaar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedSongs.map((item, index) => (

                                        <tr key={index}>
                                            <td>
                                                <span className="d-inline-flex justify-content-center align-items-center figma-red text-white rounded-circle" style={{ width: '2.2rem', height: '2.2rem' }}>
                                                    {item.position}
                                                </span>

                                            </td>
                                            <td>
                                                {item.artistName}
                                            </td>
                                            <td>
                                                {item.title}
                                            </td>
                                            <td>{item.releaseYear}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center my-3">
                                <button
                                    className="btn figma-red text-white me-2"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Vorige
                                </button>
                                <span className="align-self-center">Pagina {currentPage} van {totalPages}</span>
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
            </div>
        </>
    )
}

