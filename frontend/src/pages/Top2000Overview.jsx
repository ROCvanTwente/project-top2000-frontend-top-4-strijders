import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Studio from '../assets/Studio.jpg';
import Party from '../assets/Party.jpg';
import CD from '../assets/CD.jpg';

import DaysUntil from '../components/Daysuntil.jsx';


const items = [
    {
        title: 'Item 1',
        description: 'Description for Item 1',
        year: 2024,
    },
    {
        title: 'Item 2',
        description: 'Description for Item 2',
        year: 2021,
    },
    {
        title: 'Item 3',
        description: 'Description for Item 3',
        year: 2026,
    },
    {
        title: 'Item 4',
        description: 'Description for Item 4',
        year: 2028,
    },
    {
        title: 'Item 5',
        description: 'Description for Item 5',
        year: 2022,
    },
];


export default function Homepage() {
    const [top2000Entries, setTop2000Entries] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7003/api/GetTop2000Entries?year=2024')
            .then(res => res.json())
            .then(data => setTop2000Entries(data))
            .catch(err => console.error(err));
    }, []);

    console.log(top2000Entries);
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
                                            <select className="form-select">
                                                <option value="2025">2025</option>
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
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
                                            />
                                        </div>
                                    </div>


                                    <div className="col-12 col-lg-4">
                                        <div className=" p-3">
                                            <p className="mb-2 ms-1">Sorteer op</p>
                                            <select className="form-select">
                                                <option value="Positie">Positie</option>
                                                <option value="Titel">Artiest</option>
                                                <option value="Titel">Titel</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/*top 5 card*/}
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
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className="d-inline-flex justify-content-center align-items-center bg-danger text-white rounded-circle" style={{ width: '2rem', height: '2rem' }}>
                                                        {index + 1}
                                                    </span>

                                                </td>
                                                <td>{item.title}</td>
                                                <td>{item.artist}</td>
                                                <td>{item.year}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

