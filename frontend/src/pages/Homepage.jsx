import React from 'react'

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

    return (
        <>
            <div className="container-lg  pt-4 ">

                <div className="row px-1 d-flex justify-content-center g-5">
                    {/*carousel*/}
                    <div className="col-12 ">
                        <div className="card shadow border-0">
                            <div className="card-header bg-white d-inline-flex figma-red-text border-0">
                                <p>Carousel placeholder</p>
                            </div>
                            <div className="card-body">
                                test
                            </div>
                        </div>
                    </div>

                    {/*welkom card*/}
                    <div className="col-12">
                        <div className="card shadow border-0">
                            <div className="card-header bg-white d-inline-flex figma-red-text border-0">
                                <i className="bi icons-standard p-1 bi-music-note-beamed"></i>
                                <p className="m-0 align-items-center fs-4 d-flex">Welkom bij de TOP 2000</p>
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
                        <div className="card px-3 shadow border-0">
                            <div className="card-header border-0 bg-white figma-red-text d-inline-flex text-center ">
                                <i className="bi p-2 icons-standard bi-graph-up-arrow"></i>
                                <p className="m-0 align-items-center fs-4 d-flex">Top 5 van 2024</p>
                            </div>
                            <div className="card-body">

                                {items.map((item, index) => {
                                    return (
                                        <div className="card border-0 top-5-background mb-3">
                                            <div className="row">
                                                <div className="col-1 d-flex justify-content-center align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="red-circle">
                                                            <p className="text-light fs-5 p-0 m-0">{index + 1}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-10">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.title}</h5>
                                                        <p className="card-text">{item.description}</p>

                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex  justify-content-center align-items-center">
                                                    <span
                                                        className=" float-end align-items-center ">{item.year}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

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

