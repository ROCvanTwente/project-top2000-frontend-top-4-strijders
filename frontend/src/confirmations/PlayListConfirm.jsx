import {useLocation, useNavigate} from "react-router-dom";
const PlayListConfirm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const songData = location.state?.item;

    const onCancel = () => {

        navigate("/songpage");
        console.log('Playlist creation cancelled');
    }

    const action = async () => {
        try {
            const res = await fetch(`https://localhost:7003/api/PlayList/AddSongToPlaylist?userId=${loggedinUserID}&songId=${songData.songs.songId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json()).then(data => {
                console.log('Song added to playlist:', data);
            }).catch((error) => {
                console.error('Error adding song to playlist:', error);
            });
            returner(res);
            return res
        } catch (error) {
            return null;
        }
    }

    const returner = (res) => {
        navigate("/playlists" , { state: { res: res } });
    }
  return (
    <div className="d-flex flex-column pt-5 gap-4 align-items-center justify-content-center h-100">
      <h2>Confirm Playlist Creation</h2>
      <p>Are you sure you want to create the playlist?</p>
      <button className="btn btn-dark" onClick={action}>Yes, Create Playlist</button>
      <button className="btn btn-dark" onClick={onCancel}>No, Cancel</button>
    </div>
  );
}

export  default PlayListConfirm;

