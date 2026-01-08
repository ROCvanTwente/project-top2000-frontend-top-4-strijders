import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Openingsact from "./pages/Openingsact"
import Playlists from "./pages/Playlists.jsx";

function App() {
  return (
    <div className={" d-flex flex-column min-vh-100"}>
      <Navbar />

      <main className={"flex-fill"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/openingsact" element={< Openingsact/>} />
            <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </main>

        <div className={"mt-5 w-100"}>
            <Footer/>
        </div>
    </div>
  )
}

export default App
