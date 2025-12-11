import React from 'react'
import Studio from '../assets/Studio.jpg';
import Party from '../assets/Party.jpg';
import CD from '../assets/CD.jpg';


function Homepage() {

    return (
        <>
            <div className="container-lg pt-4 ">

                <div className="row justify-content-center g-5">
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
                        <div className="card shadow border-0">
                            <div className="card-header">
                                Welkom bij de TOP 2000
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    De TOP 2000 is een jaarlijks terugkerende lijst van de 2000 populairste nummers
                                    aller tijden, samengesteld op basis van stemmen van luisteraars van NPO Radio 2. De
                                    lijst wordt traditioneel uitgezonden tussen Kerst en Oud en Nieuw en is uitgegroeid
                                    tot een van de meest geliefde muziekevenementen in Nederland.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/*top 5 card*/}
                    <div className="col-12 ">
                        <div className="card shadow border-0">
                            <div className="card-header">
                                <span>
                                    <i className="bi icons-standard bi-graph-up-arrow"></i>
                                    Top 5 van 2024
                                </span>
                            </div>
                            <div className="card-body">


                                <a href="#" className="btn figma-red text-light">Go somewhere</a>
                            </div>
                        </div>

                    </div>

                    {/*infocards*/}
                    <div className="row g-4">
                        {/* Card 1 */}
                        <div className="col-12 col-sm-4">
                            <div className="card rounded-4 p-4 shadow border-0">
                                <div className="body-header figma-red-text">
                                    <h2>info card 1</h2>
                                </div>
                                <div className="card-body">
                                    Ontdek alle artiesten die ooit in de TOP 2000 hebben gestaan
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-12 col-sm-4">
                            <div className="card rounded-4 p-4 shadow border-0">
                                <div className="body-header figma-red-text">
                                    <h2>info card 2</h2>
                                </div>
                                <div className="card-body">
                                    Ontdek alle artiesten die ooit in de TOP 2000 hebben gestaan
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-12 col-sm-4">
                            <div className="card rounded-4 p-4 shadow border-0">
                                <div className="body-header figma-red-text">
                                    <h2>info card 3</h2>
                                </div>
                                <div className="card-body">
                                    Ontdek alle artiesten die ooit in de TOP 2000 hebben gestaan
                                </div>
                            </div>
                        </div>
                    </div>



                    {/*footer spacer */}
                </div>
            </div>
        </>
    )
}

export default Homepage