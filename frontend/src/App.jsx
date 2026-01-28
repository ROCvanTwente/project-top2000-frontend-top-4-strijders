import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import History from "./pages/History"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Openingsact from "./pages/Openingsact"
import Playlists from "./pages/Playlists.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/faq.jsx";
import Songoverview from "./pages/Songoverview.jsx"

import Dalers from "./pages/Dalers.jsx"
import Stijgers from "./pages/Stijgers.jsx"
import Verdwenen from "./pages/Verdwenen.jsx"

function App() {
  return (
    <div className={" d-flex flex-column min-vh-100"}>
      <Navbar />

      <main className={"flex-fill"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/openingsact" element={< Openingsact />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/geschiedenis" element={<History />} />
          <Route path="/faq" element={<FAQ />} />
          {/* <Route path="/" element={<Artists />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/songoverview" element={<Songoverview />} />
          <Route path="/statistieken/grootste-dalers" element={<Dalers/>}/>
          <Route path="/statistieken/grootste-stijgers" element={<Stijgers/>}/>
          <Route path="/statistieken/verdwenen-nummers" element={<Verdwenen/>}/>
        </Routes>
      </main>

      <div className={"mt-5 w-100"}>
        <Footer />
      </div>
    </div>
  )
}

export default App
