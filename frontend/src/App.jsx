import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Openingsact from "./pages/Openingsact"
import Playlists from "./pages/Playlists.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ArtistAdmin from "./admin/AritstAdmin.jsx"

function App() {
  return (
    <div className={" d-flex flex-column min-vh-100"}>
      <Navbar />

      <main className={"flex-fill"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/openingsact" element={< Openingsact/>} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/beheer-artiesten" element={<ArtistAdmin />} />
        </Routes>
      </main>

        <div className={"mt-5 w-100"}>
            <Footer/>
        </div>
    </div>
  )
}

export default App
