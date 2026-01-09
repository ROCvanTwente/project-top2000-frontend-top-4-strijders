import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Artists = [
    {
        name: 'Item 1',
        wiki: 'Description for Item 1',
        biography: 'Description for Item 1',
        photo: 'Description for Item 1',
    }
];

export default function ArtistAdmin() {
    const [selectedArtist, setSelectedArtist] = React.useState('')
    const [wiki, setWiki] = useState('')
    const [biography, setBiography] = useState('')
    const [photo, setPhoto] = useState('')

    return (
        <>
            <div className="container-lg pt-4">
                <div className='row g-4'>
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card shadow border-0 p-2">
                                <div className="card-header border-0 bg-white figma-red-text">
                                    <span>
                                        <i class="bi icons-standard bi-people me-3" style={{ fontSize: '20px' }}></i>
                                        Artiest Beheer
                                    </span>
                                </div>
                                <div className="card-body py-2">
                                    <div className="p-3">
                                        <p className="mb-2 ms-1">Selecteer artiest</p>
                                        <select
                                            className="form-select redfocus-input"
                                            value={selectedArtist}
                                            onChange={(e) => setSelectedArtist(e.target.value)}
                                        >
                                            <option value="" disabled hidden>-- kies een artiest --</option>
                                            {Artists.map((artist) => (
                                                <option key={artist.id} value={artist.name}>
                                                    {artist.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {selectedArtist && (
                        <div className="col-12">
                            <Link to="/beheer-artiesten" className="text-decoration-none">
                                <div className="card shadow admin-shadow-hover border-0 p-2">
                                    <div className="card-header admin-header border-0 bg-white figma-red-text">
                                        <span>Bewerk: {selectedArtist}</span>
                                    </div>
                                    <div className="card-body py-2">
                                        <div className="mb-3">
                                            <label className="form-label">Biografie</label>
                                            <textarea
                                                className="form-control redfocus-input"
                                                value={biography}
                                                onChange={(e) => setBiography(e.target.value)}
                                                rows={3}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Wikipedia Link</label>
                                            <input
                                                type="text"
                                                className="form-control redfocus-input"
                                                value={wiki}
                                                onChange={(e) => setWiki(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Foto</label>
                                            <input
                                                type="text"
                                                className="form-control redfocus-input"
                                                value={photo}
                                                onChange={(e) => setPhoto(e.target.value)}
                                            />
                                        </div>

                                        <div className="alert alert-warning p-2" role="alert" style={{ fontSize: '0.9rem' }}>
                                            <strong>Let op:</strong> De artiestennaam kan niet worden aangepast.
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