import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';

export default function BestArtists() {
    const [artists, setArtist] = useState([]);
    const [sortBy, setSortBy] = useState("positie");
    const [year, setYear] = useState(2024);
    const [amount, setAmount] = useState("3");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;


    // Fetch filtered by year
    useEffect(() => {
        if (!amount) return; // no fetch is amount is empty

        fetch(`https://localhost:7003/api/Statistieken/GetArtistWithMostSongsOnYear?year=${year}&amount=${amount}`)
            .then(res => res.json())
            .then(data => setArtist(data))
            .catch(err => console.error('Data ophalen mislukt. Probeer het opnieuw'));
    }, [year, amount]);

    console.log(artists);
    // Reset to first page when year or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [year, sortBy]);


    const sortedArtists = useMemo(() => {
        const entries = [...artists];

        switch (sortBy) {
            case "artiest":
                entries.sort((a, b) =>
                    a.artistName.localeCompare(b.artistName)
                );
                break;

            case "hoogste":
                entries.sort((a, b) => a.highest - b.highest);
                break;

            case "gemiddelde":
                entries.sort((a, b) => a.average - b.average);
                break;

            case "aantal":
                entries.sort((a, b) => b.totalSongs - a.totalSongs);
                break;

            default:
                break;
        }

        return entries;
    }, [artists, sortBy]);



    // Pagination logic
    const paginatedArtists = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedArtists.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedArtists, currentPage]);

    const totalPages = Math.ceil(sortedArtists.length / itemsPerPage);

    // Loading until fetched
    if (artists.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="container-lg  pt-4 ">

                {/*Filters*/}
                <div className="col-12">
                    <div className="card shadow border-0 p-2">
                        <div className="card-header border-0 bg-white figma-red-text">
                            Liedjes die in {year} op dezelfde positie zijn gebleven
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                                    <div className=" p-3">
                                        <p className="mb-2 ms-1">Jaar</p>
                                        <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
                                            {Array.from({ length: 26 }, (_, i) => 2024 - i).map(y => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                                    <div className="p-3">
                                        <p className="mb-2 ms-1">Aantal artiesten</p>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={amount}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === "") return setAmount("");
                                                const range = Math.min(Math.max(Number(val), 1), 300);
                                                setAmount(range.toString());
                                            }}
                                            min={1}
                                            max={300}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className=" p-3">
                                        <p className="mb-2 ms-1">Sorteer op</p>
                                        <select
                                            className="form-select"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="artiest">Artiest</option>
                                            <option value="hoogste">Hoogste positie</option>
                                            <option value="gemiddelde">Gemiddelde positie</option>
                                            <option value="aantal">Aantal liedjes</option>
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
                                        <th scope="col">Hoogste positie</th>
                                        <th scope="col">Gemiddelde positie</th>
                                        <th scope="col">Aantal liedjes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedArtists.map(item => (
                                        <tr key={item.artistId} className="align-middle">
                                            <td className='ps-3'>{item.artistName}</td>

                                            <td>
                                                <span
                                                    className="d-inline-flex justify-content-center align-items-center figma-red text-white rounded-circle"
                                                    style={{ width: '2.2rem', height: '2.2rem' }}
                                                >
                                                    {item.highest}
                                                </span>
                                            </td>

                                            <td>{item.average}</td>
                                            <td>{item.totalSongs}</td>
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

