import { Routes, Route } from "react-router-dom"

import background from "./assets/background.svg"
import Homepage from "./pages/Homepage"
import Overview from "./pages/Top2000Overview"
import History from "./pages/History"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Openingsact from "./pages/Openingsact"
import Playlists from "./pages/Playlists.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/faq.jsx";
import Songpage from "./pages/Songpage.jsx";

function App() {
  return (
    <div className={" d-flex flex-column min-vh-100"}>
      <div className={"background-icon"}>
        <i class="bi icon-background bi-record-circle"></i>
      <Navbar />

      <main className={"flex-fill"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Overview" element={<Overview />} />
          <Route path="/openingsact" element={< Openingsact/>} />
            <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </main>

      <div className={"mt-5 w-100"}>
        <Footer />
      </div>
</div>
    </div>
  )
}

export default App
