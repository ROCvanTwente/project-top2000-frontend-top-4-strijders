// frontend/src/pages/Playlists.jsx
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export default function Playlists() {
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useState(null);
    const [songs, setSongs] = useState([]);

    const token = localStorage.getItem("accessToken");


    useEffect(() => {

        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token found");
            navigate('/login'); // Redirect to login
            return;
        }

        try {
            fetch("http://top2000backend.runasp.net/api/Playlist/retrieve", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        if (res.status === 401) {
                            console.error("Unauthorized - token may be invalid or expired");
                            localStorage.removeItem("accessToken");
                            navigate('/login');
                        }
                    }
                    return res.json();
                })
                .then((res) => {
                    const normalized = Array.isArray(res)
                        ? res.map((p) => (p?.data ? p.data : p))
                        : [];
                    setPlaylists(normalized);
                })
                .catch((err) => {
                    console.error("Error fetching playlists:", err);
                }).finally(() => {});
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }

        try {

        } catch (error) {
            console.error("Error fetching cover:", error);
        }




    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('http://top2000backend.runasp.net/api/PlayList/Create', {
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

    const handleDelete = async (type,data,playlistId) => {
        navigate("/playlistconfirmation", {
            state: {
                item: data,
                action: "delete",
                type: type,
                playlistId: playlistId
            }
        })
    }
    const handleClick = async (playlistId) => {
        setPlaylistId(playlistId);
        fetch(`http://top2000backend.runasp.net/api/playlist/${playlistId}/songs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setSongs(data);
            })
            .catch((err) => {
                console.error("Error fetching songs from playlist:", err);
            });
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
                                <div key={playlist.id} onClick={() => handleClick(playlist.id)} lick className="card-body d-flex align-items-center">
                                    <p className="mb-0">{playlist.name}</p>
                                    <img
                                        src="https://img.icons8.com/ios-glyphs/30/000000/trash--v1.png"
                                        alt="Verwijder playlist"
                                        className="ms-auto"
                                        onClick={() => handleDelete('playlist', playlist, playlist.id)}
                                    />
                                </div>
                            ))
                        )}

                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            {
                                songs.length === 0 ? (
                                    <p>Geen nummers in deze afspeellijst</p>
                                ) : (
                                    songs.map((song) => (
                                        <div key={song.id} className="d-flex align-items-center mb-3">
                                            <img
                                                src={song.coverUrl}
                                                alt={song.title}
                                                className="me-3"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                            <div>
                                                <p className="mb-0">{song.titel}</p>
                                                <small className="text-muted">{song.artistName}</small>
                                            </div>
                                            <img
                                                src="https://img.icons8.com/ios-glyphs/30/000000/trash--v1.png"
                                                alt="Verwijder nummer"
                                                className="ms-auto"
                                                onClick={() => handleDelete('song', song, playlistId)}
                                            />
                                        </div>
                                    ))
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}