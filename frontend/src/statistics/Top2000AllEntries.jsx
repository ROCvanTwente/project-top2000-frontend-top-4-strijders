import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';

export default function Top2000AllEntries() {
    const [songs, setSongs] = useState([]);
    const [sortBy, setSortBy] = useState("positie");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const [fetchErrorMessage, setFetchErrorMessage] = useState('');


    // Fetch filtered by year
    useEffect(() => {
        fetch(`https://localhost:7003/api/Statistieken/GetEntriesOfAllTheYears`)
            .then(res => res.json())
            .then(data => setSongs(data))
            .catch(err => setFetchErrorMessage('Data ophalen mislukt. Probeer het opnieuw'));
    }, []);

    // Reset to first page when year or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy]);


    const sortedSongs = useMemo(() => {
        const entries = [...songs];

        switch (sortBy) {
            case "artiest":
                entries.sort((a, b) =>
                    a.artistName.localeCompare(b.artistName)
                );
                break;

            case "titel":
            default:
                entries.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
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

    if (fetchErrorMessage) {
        return <div className=" mt-5 alert alert-danger alert-dismissible fade show" role="alert">
            {fetchErrorMessage}
        </div>
    }

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
                            Liedjes die in elke editie van de Top2000 staan
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-lg-4">
                                    <div className=" p-3">
                                        <p className="mb-2 ms-1">Sorteer op</p>
                                        <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                            <option value="titel">Titel</option>
                                            <option value="artiest">Artiest</option>
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
                                        <th scope="col" className='ps-3'>Artiest</th>
                                        <th scope="col">Titel</th>
                                        <th scope="col">Jaar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedSongs.map((item, index) => (

                                        <tr key={index}>
                                            <td className='ps-3'>
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

