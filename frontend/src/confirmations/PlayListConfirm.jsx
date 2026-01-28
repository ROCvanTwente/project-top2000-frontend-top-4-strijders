import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";

const PlayListConfirm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const playlistId = location.state?.playlistId ?? null;
    const songData = location.state?.item ?? null;
    const type = location.state?.type ;
    const [actionForCall] = useState(location.state?.action);
    const name = location.state?.title ?? null;
    const [playlists, setPlaylists] = useState([]);
    useAuth(); // keep auth context init if needed, avoid unused binding
    const token = localStorage.getItem("accessToken");

    const onCancel = () => {
        navigate("/playlists");
    };

    useEffect(() => {
        // use async/await and a robust normalization so the frontend accepts both
        // an array of { data: {...} } wrappers and plain arrays
        const fetchPlaylists = async () => {
            if (!token) {
                console.warn('No token available, redirecting to login');
                navigate('/login');
                return;
            }

            try {
                const res = await fetch("https://localhost:7003/api/PlayList/retrieve", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        console.log("Unauthorized - token may be invalid or expired");
                        localStorage.removeItem("accessToken");
                        navigate('/login');
                        return;
                    }
                    console.error(`Failed to fetch playlists: ${res.status}`);
                    return;
                }

                const data = await res.json();

                let normalized = [];
                if (Array.isArray(data)) {
                    normalized = data.map((p) => (p?.data ? p.data : p));
                } else if (data && data?.data) {
                    normalized = [data.data];
                }

                setPlaylists(normalized);
            } catch (err) {
                console.error("Error fetching playlists:", err);
            }
        };

        fetchPlaylists();
    }, [token, navigate])


    const onConfirm = async (action, playlistId , songId = null) => {
        try {
            if (action === 'add') {
                if (!songData?.songs?.songId) {
                    console.error('Missing songId for add');
                    return;
                }
                const res = await fetch(`https://localhost:7003/api/PlayList/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        SongId: Number(songData.songs.songId),
                        PlaylistId: Number(playlistId)
                    })
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        console.error('Unauthorized (401) when adding to playlist');
                        navigate('/login');
                        return;
                    }
                    const txt = await res.text().catch(() => null);
                    console.error('Add to playlist failed', res.status, txt);
                    return;
                }
                navigate("/playlists");
            }

            if (action === 'create') {
                // server endpoint currently binds a raw string from body - keep sending JSON string
                const res = await fetch('https://localhost:7003/api/PlayList/Create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(name),
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        console.error('Unauthorized (401) when creating playlist');
                        navigate('/login');
                        return;
                    }
                    const txt = await res.text().catch(() => null);
                    console.error(`Create playlist failed with status ${res.status}`, txt);
                    return;
                }

                navigate('/playlists');
            }

            if (action === 'delete') {
                const res = await fetch("https://localhost:7003/api/PlayList/remove", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PlaylistId: Number(playlistId),
                        SongId: type === "playlist" ? null : Number(songId),
                        Type: type
                    })
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        console.error('Unauthorized (401) when deleting');
                        navigate('/login');
                        return;
                    }
                    const txt = await res.text().catch(() => null);
                    console.error('Delete failed', res.status, txt);
                    return;
                }

                navigate('/playlists');
            }
        } catch (error) {
            console.error('Error during confirmation:', error);
        }
    };

    const renderContent = () => {
        switch (actionForCall) {
            case 'add':
                return (
                    <>
                        <h2>Playlist kiezen</h2>
                        {playlists.length === 0 ? (
                            <p>Geen afspeellijsten gevonden</p>
                        ) : (
                            <div className="d-flex flex-column gap-2">
                                {playlists.map((pl) => (

                                    <div
                                        key={pl?.id ?? pl?.id}
                                        onClick={() => onConfirm(actionForCall, pl?.id ?? pl?.id)}
                                        className="card p-5"
                                    >
                                        <p className="mb-0">{pl?.name ?? pl?.Name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button className="btn btn-outline-dark" onClick={onCancel}>
                            Annuleren
                        </button>
                    </>
                );

            case 'create':
                return (
                    <>
                        <h2>Bevestig aanmaken</h2>
                        <p>Weet je zeker dat je de playlist "{name}" wil aanmaken?</p>
                        <button className="btn btn-dark" onClick={() => onConfirm(actionForCall)}>
                            Aanmaken
                        </button>
                        <button className="btn btn-outline-dark" onClick={onCancel}>
                            Annuleren
                        </button>
                    </>
                );

            case 'delete':
                return (
                    <>
                        <h2>Bevestig verwijderen</h2>
                        <p>Weet je zeker dat je de playlist wil verwijderen?</p>
                        <button className="btn btn-dark" onClick={() => onConfirm(actionForCall, playlistId, songData.songId)}>
                            Verwijderen
                        </button>
                        <button className="btn btn-outline-dark" onClick={onCancel}>
                            Annuleren
                        </button>
                    </>
                );

            default:
                return <p>Ongeldige actie</p>;
        }
    };


    return (
        <div className="d-flex flex-column pt-5 gap-4 align-items-center justify-content-center h-100">
            {renderContent()}
        </div>
    );
};

export default PlayListConfirm;
