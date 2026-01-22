export default function Playlists() {

    let videoId;
    let src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1`;
    // TODO database tabel genaamd ID maken met daarin spotify playlist id's

    //

    //retriev functie voor de songs in playlist

    // eigelijk moet de call voor de ids gebeuren op de songs pagina en hier alleen het laden van de ids die in de playlist zitten

    // hierna moet er een functie komen die de ids omzet naar een



    // drop down with all the options when searching for songs
    return (
    <div className="container">
        <div className="col-12">
            <h1>Playlists Page</h1>
        </div>
        <div className="col-4">
            <iframe
                width="100%"
                height="100%"
                src={src}
                allow="autoplay"
                title="YouTube player"
            />
        </div>
        <div className="col-8">

        </div>
    </div>
  )
}
