import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import Studio from '../assets/Studio.jpg';
import Party from '../assets/Party.jpg';
import CD from '../assets/CD.jpg';

import DaysUntil from '../components/Daysuntil.jsx';
import useSearch from '../components/Searchfunction.jsx';

export default function Homepage() {
    const [top2000Entries, setTop2000Entries] = useState([]);
    const [sortBy, setSortBy] = useState("positie");
    const [year, setYear] = useState(2024);
    const [searchArtist, setSearchArtist] = useState("");

    const [fetchErrorMessage, setFetchErrorMessage] = useState('');



    useEffect(() => {
        fetch(`https://localhost:7003/api/GetTop2000Entries?year=${year}`)
            .then(res => res.json())
            .then(data => setTop2000Entries(data))
            .catch(err => setFetchErrorMessage('Data ophalen mislukt. Probeer het opnieuw'));
    }, [year]);

    const sortedEntries = useMemo(() => {
        const entries = [...top2000Entries];

        switch (sortBy) {
            case "titel":
                entries.sort((a, b) =>
                    a.songs.titel.localeCompare(b.songs.titel)
                );
                break;

            case "artiest":
                entries.sort((a, b) =>
                    a.songs.artist.name.localeCompare(b.songs.artist.name)
                );
                break;

            case "positie":
            default:
                break;
        }

        return entries;
    }, [top2000Entries, sortBy]);

    const searchedEntries = useSearch(
        sortedEntries,
        searchArtist,
        item => item.songs.artist.name
    );

    return (
        <>
            <div className="container-lg  pt-4 ">

                <div className="row px-1 d-flex justify-content-center g-5">
                    {/*Filters*/}
                    <div className="col-12">
                        <div className="card shadow border-0 p-2">
                            <div className="card-header border-0 bg-white figma-red-text">
                                TOP 2000 overzicht
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
                                            <p className="mb-2 ms-1">Filter op artiest</p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Zoek een artiest..."
                                                value={searchArtist}
                                                onChange={(e) => setSearchArtist(e.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="col-12 col-lg-4">
                                        <div className=" p-3">
                                            <p className="mb-2 ms-1">Sorteer op</p>
                                            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                                <option value="positie">Positie</option>
                                                <option value="titel">Titel</option>
                                                <option value="artiest">Artiest</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*top2000 table*/}
                    <div className="col-12">
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
                                        {searchedEntries.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className="d-inline-flex justify-content-center align-items-center figma-red text-white rounded-circle" style={{ width: '2.2rem', height: '2.2rem' }}>
                                                        {item.position}
                                                    </span>

                                                </td>
                                                <td>{item.songs.titel}</td>
                                                <td>{item.songs.artist.name}</td>
                                                <td>{item.year}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {fetchErrorMessage && (
                                    <div className=" mt-3 alert alert-danger alert-dismissible fade show" role="alert">
                                        {fetchErrorMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

