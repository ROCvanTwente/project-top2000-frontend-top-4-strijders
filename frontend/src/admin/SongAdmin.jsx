import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Songs = [
    {
        id: 1,
        Titel: 'Item 1',
        ReleaseYear: 1972,
        imgUrl: 'Description for Item 1',
        Lyrics: 'Description for Item 1',
        Youtube: 'Description for Item 1',
    }
];

export default function SongsAdmin() {
    const [selectedSong, setSelectedSong] = React.useState('')
    const [titel, setTitel] = useState('')
    const [releaseYear, setReleaseYear] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [lyrics, setLyrics] = useState('')
    const [youtube, setYoutube] = useState('')

    return (
        <>
            <div className="container-lg pt-4">
                <div className='row g-4'>
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card shadow border-0 p-2">
                                <div className="card-header border-0 bg-white figma-red-text">
                                    <span>
                                        <i class="bi icons-standard bi-music-note-beamed me-3" style={{ fontSize: '20px' }}></i>
                                        Nummer Beheer
                                    </span>
                                </div>
                                <div className="card-body py-2">
                                    <div className="p-3">
                                        <p className="mb-2 ms-1">Selecteer nummer</p>
                                        <select
                                            className="form-select redfocus-input"
                                            value={selectedSong}
                                            onChange={(e) => setSelectedSong(e.target.value)}
                                        >
                                            <option value="" disabled hidden>-- kies een nummer --</option>
                                            {Songs.map((song) => (
                                                <option key={song.id} value={song.titel}>
                                                    {song.Titel}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {selectedSong && (
                        <div className="col-12">
                            <Link to="/beheer-artiesten" className="text-decoration-none">
                                <div className="card shadow admin-shadow-hover border-0 p-2">
                                    <div className="card-header admin-header border-0 bg-white figma-red-text">
                                        <span>{selectedSong}</span>
                                    </div>
                                    <p className="px-3 text-secondary">Door -artiestnaam-</p>
                                    <div className="card-body py-2">
                                        <div className="mb-3">
                                            <label className="form-label">Jaar van uitgave</label>
                                            <input
                                                type="text"
                                                className="form-control redfocus-input"
                                                value={releaseYear}
                                                onChange={(e) => setReleaseYear(e.target.value)}
                                            />

                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Songtekst</label>
                                            <textarea
                                                className="form-control redfocus-input"
                                                value={lyrics}
                                                onChange={(e) => setLyrics(e.target.value)}
                                                rows={3}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Ablum foto</label>
                                            <input
                                                type="text"
                                                className="form-control redfocus-input"
                                                value={imgUrl}
                                                onChange={(e) => setImgUrl(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Youtube link</label>
                                            <input
                                                type="text"
                                                className="form-control redfocus-input"
                                                value={youtube}
                                                onChange={(e) => setYoutube(e.target.value)}
                                            />
                                        </div>

                                        <div className="alert alert-warning p-2" role="alert" style={{ fontSize: '0.9rem' }}>
                                            <strong>Let op:</strong>De artiest en titel kunnen niet worden aangepast.
                                        </div>

                                        <button className="btn figma-red text-white w-100 py-2">
                                            <span>
                                                <i className="bi bi-floppy me-3"></i>
                                                Opslaan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}