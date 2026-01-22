// frontend/src/pages/Playlists.jsx
import { useState, useEffect } from "react";

export default function Playlists() {

    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loggedinUserID, setLoggedinUserID] = useState("097E07E0-44B8-43FC-B049-7B92AF5FA34F");
    const handleClick = () => {
        setSongs()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('https://localhost:7003/api/PlayList/Create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.name)
            }).then(res => res.json())
                .then(data => {
                    setPlaylists(prev => [...prev, data]) ;
                }).catch((err) => {
                    console.log(err);
                })

        } catch (Error) {
            console.error('Error adding playlist:', Error);
        }
    }


    return (
        <div className="container">
            <div className="col-12 pt-5">
                <div className="card shadow">
                    <div className="card-header">
                        <p className="fs-4 figma-red-text">Mijn afspeellijsten</p>
                    </div>
                    <div className="card-body d-flex align-items-center">
                        <div className="row w-100">
                            <div className="col-12">
                                <div className="input-group">
                                    <form method="post" className="w-100" onSubmit={handleSubmit}>
                                     <div className="input-group">
                                       <input
                                         type="text"
                                         name="name"
                                         className="form-control inpu"
                                         placeholder="Naam nieuwe playlist..."
                                       />
                                       <button
                                         type="submit"
                                         className="btn btn-danger figma-red-bg text-white fw-semibold"
                                       >
                                         <span className="d-inline d-sm-none">+</span>
                                         <span className="d-none d-sm-inline">
                                           <span className="me-2">+</span>Aanmaken
                                         </span>
                                       </button>
                                     </div>
                                   </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-4 ">
                <div className="col-4">
                    <p>Mijn lijsten</p>
                    <div className="card">
                        {playlists.length === 0 ? (
                            <div className="card-body">
                                <p>Nog geen afspeellijsten</p>
                            </div>
                        ) : (
                            playlists.map((playlist) => (
                                <div key={playlist.id} onClick={handleClick} lick className="card-body d-flex align-items-center">
                                    <p className="mb-0">{playlist.name}</p>
                                    <img
                                        src="https://img.icons8.com/ios-glyphs/30/000000/trash--v1.png"
                                        alt="Verwijder playlist"
                                        className="ms-auto"
                                    />
                                </div>
                            ))
                        )}

                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <p>Inhoud van de geselecteerde playlist</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}