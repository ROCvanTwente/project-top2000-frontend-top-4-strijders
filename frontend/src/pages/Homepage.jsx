import React from 'react'

function Homepage() {

    return (
        <>
            <div className="container-lg pt-4 ">

                <div className="row justify-content-center g-5">
                    {/*carousel*/}
                    <div className="col-12">
                        <div className="card shadow border-0">
                            <div className="card-header border-0">
                                Carousel placeholder
                            </div>
                            <div className="card-body">
                                test
                            </div>
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