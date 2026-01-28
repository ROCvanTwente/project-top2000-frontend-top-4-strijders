import React, { useState, useEffect } from 'react'

import { useAuth } from '../context/AuthContext';

export default function ArtistAdmin() {
    const [allArtists, setAllArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState({});
    const [filtered, setFiltered] = useState([]);

    const [wiki, setWiki] = useState('');
    const [biography, setBiography] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [photo, setPhoto] = useState('');

    const [errorMessages, setErrorMessages] = useState({});
    const [editResponseMessage, setEditResponseMessage] = useState('');
    const [fetchErrorMessage, setFetchErrorMessage] = useState('');

    const { IsAdmin, apiRequest } = useAuth();

    useEffect(() => {
        fetch('https://top2000backend.runasp.net/api/GetArtists')
            .then(res => res.json())
            .then(data => setAllArtists(data))
            .catch(err => setFetchErrorMessage('Data ophalen mislukt. Probeer het later opnieuw'));
    }, []);

    function handleChange(e) {
        const value = e.target.value;
        if (value === "") {
            setFiltered([]);
            return;
        }

        let matches = allArtists.filter(artist => {
            return artist.name.toLowerCase().includes(value.toLowerCase());
        });
        setFiltered(matches.slice(0, 10));
    }

    function selectItem(artist) {
        setSelectedArtist({
            artistId: artist.artistId,
            artistName: artist.name,
        });
        document.querySelector("#input").value = artist.name;
        setEditResponseMessage({})
        setWiki(artist.wiki);
        setBiography(artist.biography);
        setWebsiteUrl(artist.websiteUrl);
        setPhoto(artist.photo);
        setFiltered([]);
    }

    function post() {
        const allErrorMessages = {
            admin: "",
            wiki: "",
            biography: "",
            websiteUrl: "",
            photo: ""
        }
        if (!IsAdmin()) {
            allErrorMessages.admin = "Geen Recht!";
            setErrorMessages(allErrorMessages);
            return;
        }
        if (wiki) {
            let isValid = /^https?:\/\/([a-z]+\.)?wikipedia\.org\/.+$/i.test(wiki);
            if (!isValid) allErrorMessages.wiki = "wikipedia Url is niet juist. Probeer het opnieuw";
        }
        if (biography) {
            let isValid = /^[A-Za-z0-9\.\,\?\!\'\"\r?\n ]+$/.test(biography)
            if (!isValid) allErrorMessages.biography = "Gebruik geen speciale tekens. Toegestaan:  , . ? ! ' \"";
        }
        if (photo) {
            let isValid = /^(https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg))$/i.test(photo);
            if (!isValid) allErrorMessages.photo = "Afbeelding Url is niet juist. Probeer het opnieuw";
        }
        if (websiteUrl) {
            let isValid;
            try {
                new URL(websiteUrl);
                isValid = true;
            } catch {
                isValid = false;
            }
            if (!isValid) allErrorMessages.websiteUrl = "Website Url is niet juist. Probeer het opnieuw";
        }

        if (Object.values(allErrorMessages).some(errorMessage => errorMessage != "")) {
            setErrorMessages(allErrorMessages);
        } else {
            setErrorMessages(allErrorMessages);
            console.log("alles is goed");
            apiRequest("http://top2000backend.runasp.net/api/Edit/EditArtist", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ArtistId: selectedArtist.artistId,
                    Wiki: wiki,
                    Biography: biography,
                    WebsiteUrl: websiteUrl,
                    Photo: photo
                })
            })
                .then((res) => res.json())
                .then((data) => setEditResponseMessage(data))
                .catch(err => console.error(err));
        }
    }

    return (
        <>
            <div className="container-lg pt-4">
                <div className='row g-4'>
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card shadow border-0 p-2">
                                {fetchErrorMessage && (
                                    <div className=" mt-3 alert alert-danger alert-dismissible fade show" role="alert">
                                        {fetchErrorMessage}
                                    </div>
                                )}
                                <div className="card-header border-0 bg-white figma-red-text">
                                    <span>
                                        <i className="bi icons-standard bi-people me-3" style={{ fontSize: '20px' }}></i>
                                        Artiest Beheer
                                    </span>
                                </div>
                                <div className="card-body py-2">
                                    <div className="p-3">
                                        <p className="mb-2 ms-1">Zoek een artiest</p>
                                        <input className="form-control" placeholder="Zoek een artiest..." id="input" type="text" onChange={handleChange} />
                                        {filtered.length > 0 && (
                                            <div className="autocomplete">
                                                {filtered.map((artist, index) => (
                                                    <div key={index} className="item" onClick={() => selectItem(artist)}
                                                    >
                                                        {artist.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {Object.keys(selectedArtist).length > 0 && (
                        <div className="col-12">
                            {(errorMessages.admin) && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {errorMessages.admin}
                                </div>
                            )}
                            {(editResponseMessage.message) && (
                                <div className="alert alert-success fade show" role="alert">
                                    {editResponseMessage.message}
                                </div>
                            )}
                            <div className="card shadow admin-shadow-hover border-0 p-2">
                                <div className="card-header admin-header border-0 bg-white figma-red-text">
                                    <span>Bewerk: {selectedArtist.artistName}</span>
                                </div>
                                <div className="card-body py-2">
                                    <div className="mb-3">
                                        <label className="form-label">Biografie</label>
                                        <textarea
                                            className="form-control redfocus-input"
                                            value={biography ?? ""}
                                            onChange={(e) => setBiography(e.target.value)}
                                            rows={3}
                                        />
                                        {errorMessages.biography && (
                                            <span className='text-danger'>{errorMessages.biography}</span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Wikipedia Link</label>
                                        <input
                                            type="text"
                                            className="form-control redfocus-input"
                                            value={wiki ?? ""}
                                            placeholder='Bijv: https://nl.wikipedia.org/wiki/example'
                                            onChange={(e) => setWiki(e.target.value)}
                                        />
                                        {errorMessages.wiki && (
                                            <span className='text-danger'>{errorMessages.wiki}</span>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Foto</label>
                                        <input
                                            type="text"
                                            className="form-control redfocus-input"
                                            value={photo ?? ""}
                                            placeholder='Bijv: https://example.com/images/foto.png'
                                            onChange={(e) => setPhoto(e.target.value)}
                                        />
                                        {errorMessages.photo && (
                                            <span className='text-danger'>{errorMessages.photo}</span>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">WebsiteUrl</label>
                                        <input
                                            type="text"
                                            className="form-control redfocus-input"
                                            value={websiteUrl ?? ""}
                                            placeholder='Bijv: https://www.example.com'
                                            onChange={(e) => setWebsiteUrl(e.target.value)}
                                        />
                                        {errorMessages.websiteUrl && (
                                            <span className='text-danger'>{errorMessages.websiteUrl}</span>
                                        )}
                                    </div>

                                    <div className="alert alert-warning p-2" role="alert" style={{ fontSize: '0.9rem' }}>
                                        <strong>Let op:</strong> De artiestennaam kan niet worden aangepast.
                                    </div>

                                    <button onClick={post} className="btn figma-red text-white w-100 py-2">
                                        <span>
                                            <i className="bi bi-floppy me-3"></i>
                                            Opslaan
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}