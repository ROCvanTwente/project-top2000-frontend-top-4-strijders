import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {PiYoutubeLogoLight} from "react-icons/pi";
import Chart from '../components/Chart.jsx';
import '../css/global.css';



export default function Songpage() {
    const location = useLocation();
    const navigate = useNavigate();
    const songData = location.state?.item;

    const [amountEntries, setAmountOfEntries] = useState(0);
    const [videoId, setVideoId] = useState('');
    const [imgUrl, setImgUrl] = useState(songData?.songs?.imgUrl || '');
    const [loading, setLoading] = useState(true);
    const [posistions, setPosistions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const loggedinUserID = "097E07E0-44B8-43FC-B049-7B92AF5FA34F";

    useEffect(() => {
        if (!songData) {
            navigate('/');
            return;
        }



        const fetchData = async () => {
            try {
                const promises = [
                    fetch(`https://localhost:7003/api/Songs/GetYoutubeVideoId?title=${encodeURIComponent(songData.songs.titel)}&artist=${encodeURIComponent(songData.songs.artist.name)}`)
                        .then(res => res.text()),
                    fetch(`https://localhost:7003/api/Songs/GetAlbumCover?title=${encodeURIComponent(songData.songs.titel)}&artist=${encodeURIComponent(songData.songs.artist.name)}`)
                        .then(res => res.text()),
                    fetch(`https://localhost:7003/api/Songs/GetSongEntries?id=${encodeURIComponent(songData.songs.songId)}`)
                        .then(res => res.json()),
                    fetch(`https://localhost:7003/api/Songs/GetPositionsPerYear?songId=${encodeURIComponent(songData.songs.songId)}`)
                        .then(res => res.json())
                ];

                const [vidId, coverUrl, entriesData, positions] = await Promise.all(promises);

                setVideoId(vidId);
                if (!imgUrl) setImgUrl(coverUrl);
                setPosistions(positions);
                setAmountOfEntries(entriesData.amountOfEntries);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [songData, navigate, imgUrl]);


    const confirmAddToPlaylist = async (data) => {
        console.log(data)
        navigate("/playlistconfirmation", {state: {item: data}});
    }
    console.log(posistions)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    if (!songData) return null;
    if (loading) return <div className="container mt-5">
        <div className="text-center">Loading...</div>
    </div>;
    return (
        <div className="container mt-5">
            {/* Main card met horizontale layout */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card rounded-4 border-0 shadow overflow-hidden" style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{backgroundColor: '#d4d4d4', width: '450px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
                            <img src={imgUrl} alt="cover" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                        </div>

                        {/* Info sectie - rechts */}
                        <div style={{flex: 1}}>
                            <div className="card-body p-4">
                                <p className="mb-2 fs-5" style={{color: '#dc3545'}}>{songData.songs.titel}</p>

                                <div className="mb-3">
                                    <span style={{color: '#dc3545'}}>👤</span>
                                    <span className="ms-2">Artiest: <a href="#" className="text-decoration-none" style={{color: '#dc3545'}}>{songData.songs.artist.name}</a></span>
                                </div>

                                <div className="mb-3">
                                    <span style={{color: '#dc3545'}}>📅</span>
                                    <span className="ms-2">Jaar van uitgave: {songData.songs.releaseYear}</span>
                                </div>

                                <div className="mb-3">
                                    <span style={{color: '#dc3545'}}>📊</span>
                                    <span className="ms-2">Aantal noteringen: {amountEntries} jaar</span>
                                </div>

                                {videoId && (
                                    <>
                                        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="btn btn-danger  px-4 py-2" style={{backgroundColor: '#dc3545', border: 'none'}}>
                                            <PiYoutubeLogoLight size={32} style={{padding: "0px"}}/> Bekijk op YouTube
                                        </a>
                                        <a onClick={() => {confirmAddToPlaylist(songData)}} className="ms-3" role="button">+ Voeg toe aan playlist</a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Luister fragment sectie */}
            <div className="row">
                <div className="col-12">
                    <div className="card rounded-4 border-0 shadow">
                        <div className="card-header bg-white border-0 pt-4 px-4">
                            <h5 className="mb-0" style={{color: '#dc3545'}}>Luister fragment</h5>
                        </div>
                        <div className="card-body" style={{padding: '20px'}}>
                            {videoId && (
                                <div className="video-wrapper" style={{position: 'relative', paddingTop: '56.25%'}}>
                                    <iframe src={`https://www.youtube.com/embed/${videoId}`} title="YouTube player" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: '10px'}} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="row">
                <div className="col-12  mt-4 mb-4">
                    <div className="card shadow border-0">
                        <div className="card-header bg-white border-0 pt-4 px-4">
                            <h5 className="mb-0" style={{color: '#dc3545'}}>Positie door de jaren heen</h5>
                        </div>
                        <div className="card-body" style={{padding: '20px'}}>
                            <Chart body={posistions} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Top 3 table */}
            <div className="row mt-4">
                <div className="col-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="bg-light border-bottom">Jaar</th>
                                <th className="bg-light border-bottom">Positie</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {[...posistions].sort((a, b) => b.year - a.year).slice(0, 3).map((entry) => (
                                <tr key={entry.year} className="custom-hover1">
                                    <td>{entry.year}</td>
                                    <td><div className="red-circle fw-bold text-light">{entry.position}</div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Meer / expanded list */}
            {posistions.length > 3 && !isExpanded && (
                <div className="row">
                    <div className="col-12">
                        <button onClick={toggleExpand} className="btn btn-danger mb-3" style={{backgroundColor: '#dc3545', border: 'none', width: '100%'}}>Meer</button>
                    </div>
                </div>
            )}

            {posistions.length > 3 && isExpanded && (
                <div className="row positions-table expanded">
                    <div className="col-12">
                        <table className="table table-hover">
                            <tbody className="align-middle">
                                {posistions.slice(3).map((entry) => (
                                    <tr key={entry.year} className="custom-hover1">
                                        <td>{entry.year}</td>
                                        <td><div className="red-circle fw-bold text-light">{entry.position}</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button onClick={toggleExpand} className="btn btn-danger mb-3" style={{backgroundColor: '#dc3545', border: 'none', width: '100%'}}>Minder</button>
                    </div>
                </div>
            )}
        </div>
    );
}