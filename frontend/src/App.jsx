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
        <i className="bi icon-background bi-record-circle"></i>
      <Navbar />

      <main className={"flex-fill"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Overview" element={<Overview />} />
            <Route path="/songpage" element={<Songpage/>} />
            <Route path="/history" element={<History />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          <Route path="/openingsact" element={< Openingsact/>} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/geschiedenis" element={<History />} />
          <Route path="/faq" element={<FAQ />} />
          {/* <Route path="/" element={<Artists />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/songpage" element={<Songpage />} />
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
