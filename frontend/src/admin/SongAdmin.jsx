import React, { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext';

export default function SongsAdmin() {
    const [allSongs, setAllSongs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedSong, setSelectedSong] = useState({});

    const [releaseYear, setReleaseYear] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [youtube, setYoutube] = useState('');

    const [errorMessages, setErrorMessages] = useState({});
    const [editResponseMessage, setEditResponseMessage] = useState('');
    const [fetchErrorMessage, setFetchErrorMessage] = useState('');

    const { IsAdmin, apiRequest } = useAuth();

    useEffect(() => {
        fetch('http://top2000backend.runasp.net/api/GetSongs')
            .then(res => res.json())
            .then(data => setAllSongs(data))
            .catch(err => setFetchErrorMessage('Data ophalen mislukt. Probeer het later opnieuw'));
    }, []);

    function handleChange(e) {
        const value = e.target.value;
        if (value === "") {
            setFiltered([]);
            return;
        }

        let matches = allSongs.filter(song => {
            return song.titel.toLowerCase().includes(value.toLowerCase());
        });
        setFiltered(matches.slice(0, 10));
    }

    function selectItem(song) {
        setSelectedSong({
            songId: song.songId,
            songName: song.titel,
            artistName: song.artist.name,
        });
        document.querySelector("#input").value = song.titel;
        setEditResponseMessage({})
        setReleaseYear(song.releaseYear);
        setImgUrl(song.imgUrl);
        setLyrics(song.lyrics);
        setYoutube(song.youtube);
        setFiltered([]);
    }

    function post() {
        setEditResponseMessage({});
        const allErrorMessages = {
            admin: "",
            allEmpty: "",
            releaseYear: "",
            imgUrl: "",
            lyrics: "",
            youtube: ""
        }
        if (!IsAdmin()) {
            allErrorMessages.admin = "Geen Recht!";
            setErrorMessages(allErrorMessages);
            return;
        }
        if (!releaseYear && !imgUrl && !lyrics && !youtube) {
            allErrorMessages.allEmpty = "Er is niks ingevuld. vul minstents een vakje";
            setErrorMessages(allErrorMessages);
            return;
        } else {
            allErrorMessages.allEmpty = "";
        }
        if (releaseYear) {
            if (/^[0-9]+$/.test(releaseYear)) {
                let IsValidYear = releaseYear >= 1900 && releaseYear < 2025
                if (!IsValidYear) allErrorMessages.releaseYear = "Jaar van uitgave mag niet onder 1900 en ook niet in de toekomst zitten"
            } else allErrorMessages.releaseYear = "Jaar van uitgave mag alleen nummers (0-9) bevatten";
        } else allErrorMessages.releaseYear = "Jaar van uitgave mag niet leeg zijn";
        if (imgUrl) {
            let isValid = /^(https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg))$/i.test(imgUrl);
            if (!isValid) allErrorMessages.imgUrl = "Afbeelding Url is niet juist. Probeer het opnieuw";
        }
        if (youtube) {
            let isValid = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]{11}$/.test(youtube);
            if (!isValid) allErrorMessages.youtube = "Youtube Link is niet juist. Probeer het opnieuw";
        }
        if (lyrics) {
            let isValid = /^[A-Za-z0-9\.\,\?\!\'\"\r?\n ]+$/.test(lyrics)
            if (!isValid) allErrorMessages.lyrics = "Gebruik geen speciale tekens. Toegestaan:  , . ? ! ' \"";
        }

        if (Object.values(allErrorMessages).some(errorMessage => errorMessage != "")) {
            setErrorMessages(allErrorMessages);
        } else {
            setErrorMessages(allErrorMessages);
            console.log("alles is goed");
            apiRequest("http://top2000backend.runasp.net/api/Edit/EditSong", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    SongId: selectedSong.songId,
                    ReleaseYear: releaseYear,
                    ImgUrl: imgUrl,
                    Lyrics: lyrics,
                    Youtube: youtube
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
                                        <i className="bi icons-standard bi-music-note-beamed me-3" style={{ fontSize: '20px' }}></i>
                                        Nummer Beheer
                                    </span>
                                </div>
                                <div className="card-body py-2">
                                    <div className="p-3">
                                        <p className="mb-2 ms-1">Zoek nummer</p>
                                        <input className="form-control" placeholder="Zoek een nummer..." id="input" type="text" onChange={handleChange} />
                                        {filtered.length > 0 && (
                                            <div className="autocomplete">
                                                {filtered.map((song, index) => (
                                                    <div key={index} className="item" onClick={() => selectItem(song)}
                                                    >
                                                        {song.titel}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {Object.keys(selectedSong).length > 0 && (
                        <div className="col-12">
                            {(errorMessages.admin || errorMessages.allEmpty) && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {errorMessages.admin || errorMessages.allEmpty}
                                </div>
                            )}
                            {(editResponseMessage.message) && (
                                <div className="alert alert-success fade show" role="alert">
                                    {editResponseMessage.message}
                                </div>
                            )}
                            <div className="card shadow admin-shadow-hover border-0 p-2">
                                <div className="card-header admin-header border-0 bg-white figma-red-text">
                                    <span>{selectedSong.songName}</span>
                                </div>
                                <p className="px-3 text-secondary">{selectedSong.artistName}</p>
                                <div className="card-body py-2">
                                    <div className="mb-3">
                                        <label className="form-label">Jaar van uitgave</label>
                                        <input
                                            type="text"
                                            className="form-control redfocus-input"
                                            value={releaseYear ?? ""}
                                            onChange={(e) => setReleaseYear(e.target.value)}
                                        />
                                        {errorMessages.releaseYear && (
                                            <span className='text-danger'>{errorMessages.releaseYear}</span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Songtekst</label>
                                        <textarea
                                            className="form-control redfocus-input"
                                            value={lyrics ?? ""}
                                            onChange={(e) => setLyrics(e.target.value)}
                                            rows={3}
                                        />
                                        {errorMessages.lyrics && (
                                            <span className='text-danger'>{errorMessages.lyrics}</span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Ablum foto</label>
                                        <input
                                            type="text"
                                            className="form-control redfocus-input"
                                            value={imgUrl ?? ""}
                                            placeholder='Bijv: https://example.com/images/foto.png'
                                            onChange={(e) => setImgUrl(e.target.value)}
                                        />
                                        {errorMessages.imgUrl && (
                                            <span className='text-danger'>{errorMessages.imgUrl}</span>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Youtube link</label>
                                        <input
                                            type="text"
                                            className="form-control redfocus-input"
                                            value={youtube ?? ""}
                                            placeholder='Bijv: https://www.youtube.com/watch?v=***********'
                                            onChange={(e) => setYoutube(e.target.value)}
                                        />
                                        {errorMessages.youtube && (
                                            <span className='text-danger'>{errorMessages.youtube}</span>
                                        )}
                                    </div>

                                    <div className="alert alert-warning p-2" role="alert" style={{ fontSize: '0.9rem' }}>
                                        <strong>Let op:</strong>De artiest en titel kunnen niet worden aangepast.
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