    import React, {useEffect, useState} from 'react'
import {Link, redirect} from 'react-router-dom';
import Studio from '../assets/Studio.jpg';
import Party from '../assets/Party.jpg';
import CD from '../assets/CD.jpg';


import DaysUntil from '../components/Daysuntil.jsx';
export default function Homepage() {
    const [items, setItems] = React.useState([]);
    const [fetchErrorMessage, setFetchErrorMessage] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function loadTopFive(retries = 1) {
            try {
                const res = await fetch(
                    'http://top2000backend.runasp.net/api/GetTopFive?year=2024'
                );

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const data = await res.json();

                if (!cancelled) {
                    const sorted = data.sort((a, b) => a.position - b.position);
                    setItems(sorted);
                    setFetchErrorMessage('');
                }
            } catch (err) {
                if (retries > 0) {
                    // small delay → let IIS wake up
                    setTimeout(() => loadTopFive(retries - 1), 800);
                } else if (!cancelled) {
                    setFetchErrorMessage('Data ophalen mislukt. Probeer het opnieuw.');
                }
            }
        }

        loadTopFive();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <div className="container-lg  pt-4 ">

                <div className="row px-1 d-flex justify-content-center g-5">
                    {/*carousel*/}
                    <div className="col-12">
                        <div id="carouselExampleControls" className="carousel slide shadow" data-bs-ride="carousel">
                            {/* Indicators */}
                            <div className="carousel-indicators">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide-to="2"
                                    aria-label="Slide 3"
                                ></button>
                            </div>

                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        className="d-block w-100"
                                        src={CD}
                                        alt="First slide"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Klassiekers uit de Jaren '60-'90</h5>
                                        <p>Ontdek tijdloze muziek</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src={Party}
                                        alt="Second slide"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>TOP 2000 - De Grootste Hits Aller Tijden</h5>
                                        <p>Stem nu op jouw favoriete nummers</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src={Studio}
                                        alt="Third slide"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Live vanaf Hilversum</h5>
                                        <p>Luister naar je favoriete DJ's</p>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleControls"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleControls"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    {/*welkom card*/}
                    <div className="col-12">
                        <div className="card shadow border-0 p-2">
                            <div className="card-header border-0 bg-white figma-red-text">
                                <span>
                                    <i className="bi icons-standard bi-music-note-beamed"></i>
                                    Welkom bij de TOP 2000
                                </span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    De TOP 2000 is een jaarlijkse muzieklijst van NPO Radio 2, samengesteld op basis van
                                    stemmen van luisteraars. Tussen Kerstmis en Oudjaarsdag worden de 2000 populairste
                                    nummers aller tijden uitgezonden. Ontdek de grootste hits, stem op je favorieten en
                                    maak je eigen afspeellijsten!
                                </p>
                            </div>
                        </div>
                    </div>


                    {/*top 5 card*/}
                    <div className="col-12 ">
                        <div className="card hover px-3 shadow border-0">
                            <div className="card-header border-0 bg-white figma-red-text d-inline-flex text-center ">
                                <i className="bi p-2 icons-standard bi-graph-up-arrow"></i>
                                <p className="m-0 align-items-center fs-4 d-flex">Top 5 van 2024</p>
                            </div>
                            <div className="card-body">
                                {fetchErrorMessage && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {fetchErrorMessage}
                                    </div>
                                )}
                                {items.map((item) => {
                                    return (
                                        <Link to="/songpage" state={{ item }} className="nav-link text-white">
                                        <div className="card top-5-card border-0 top-5-background mb-3">
                                            <div className="row">
                                                <div className="col-1 d-flex justify-content-center align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="red-circle">
                                                            <p className="text-light fs-5 p-0 m-0">{item.position}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-10 d-flex  align-items-center">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.songs.titel}</h5>
                                                        <p className="card-text">{item.songs.artist.name}</p>
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex  justify-content-center align-items-center">
                                                    <span
                                                        className=" float-end align-items-center ">{item.year}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                    )
                                })}
                                <Link to="/overview" className="btn figma-red text-light">Bekijk de volledige TOP 2000</Link>
                            </div>
                        </div>

                    </div>

                    {/*infocards*/}
                    <div className="row g-4">
                        {/* Card 1 */}
                        <div className="col-12 col-sm-4">
                            <Link to="/artiesten" className="text-decoration-none">
                                <div className="card shadow border-0 p-2">
                                    <div className="card-header border-0 bg-white figma-red-text">
                                        <h5>Artiesten</h5>
                                    </div>
                                    <div className="card-body py-2">
                                        <p className="card-text pe-2">
                                            Ontdek alle artiesten die ooit in de TOP 2000 hebben gestaan
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="col-12 col-sm-4">
                            <Link to="/nummers" className="text-decoration-none">
                                <div className="card shadow border-0 p-2">
                                    <div className="card-header border-0 bg-white figma-red-text">
                                        <h5>Nummers</h5>
                                    </div>
                                    <div className="card-body py-2">
                                        <p className="card-text pe-2">
                                            Bekijk alle nummers met hun volledige geschiedenis
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="col-12 col-sm-4">
                            <Link to="/geschiedenis" className="text-decoration-none">
                                <div className="card shadow border-0 p-2">
                                    <div className="card-header border-0 bg-white figma-red-text">
                                        <h5>Geschiedenis</h5>
                                    </div>
                                    <div className="card-body py-2">
                                        <p className="card-text pe-2">
                                            Lees alles over de geschiedenis van de TOP 2000 en hoe de lijst ontstond.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/*Countdown*/}
                    <div className="row g-4 pb-4">
                        {/* X-Mas*/}
                        <div className="col-12 col-sm-6">
                            <Link to="/artiesten" className="text-decoration-none">
                                <div className="card shadow border-0 p-2">
                                    <div className="card-header border-0 bg-white figma-red-text">
                                        <h5>Dagen tot Kerst</h5>
                                    </div>
                                    <div className="card-body py-2">
                                        <DaysUntil targetDate="2026-12-25" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/*New Year*/}
                        <div className="col-12 col-sm-6">
                            <Link to="/nummers" className="text-decoration-none">
                                <div className="card shadow border-0 p-2">
                                    <div className="card-header border-0 bg-white figma-red-text">
                                        <h5>Dagen tot Oud & nieuw</h5>
                                    </div>
                                    <div className="card-body py-2">
                                        <DaysUntil targetDate="2026-12-31" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/*footer spacer */}
                </div>
            </div>
        </>
    )
}

