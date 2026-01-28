import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Overview from "./pages/Top2000Overview"
import History from "./pages/History"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Openingsact from "./pages/Openingsact"
import Playlists from "./pages/Playlists.jsx";
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./routes/ProtectedRoute.jsx"
//
import AdminPage from "./admin/AdminPage.jsx";
import ArtistAdmin from "./admin/AritstAdmin.jsx";
import SongsAdmin from "./admin/SongAdmin.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/faq.jsx";
import Songpage from "./pages/Songpage.jsx";
import PlayListConfirm from "./confirmations/PlayListConfirm.jsx";
import ArtistsOverview from "./pages/ArtistsOverview.jsx"
import ArtistDetail from "./pages/ArtistDetail.jsx"

// Statistics
import SamePosition from "./statistics/SamePosition.jsx";
import BestArtists from "./statistics/BestArtists.jsx";
import Top2000AllEntries from "./statistics/Top2000AllEntries.jsx";
import OnceInTop2000 from "./statistics/OnceInTop2000.jsx";
import Songoverview from "./pages/Songoverview.jsx"

import Dalers from "./pages/Dalers.jsx"
import Stijgers from "./pages/Stijgers.jsx"
import Verdwenen from "./pages/Verdwenen.jsx"

function App() {
  return (
    <AuthProvider>
      <div className=" d-flex flex-column min-vh-100">
      <div className="background-icon">
        <i className="bi icon-background bi-record-circle"></i>
      </div>

      <Navbar />

        <main className={"flex-fill"}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/openingsact" element={< Openingsact />} />
            <Route path="/playlists" element={<ProtectedRoute role="user"><Playlists /></ProtectedRoute>} />
            <Route path="/login" element={<ProtectedRoute role="notuser"><Login /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute role="notuser"><Register /></ProtectedRoute>} />
            <Route path="/playlistconfirmation" element={<ProtectedRoute role="user"><PlayListConfirm /></ProtectedRoute>} />
            <Route path="/Overview" element={<Overview />} />
            <Route path="/songpage" element={<Songpage/>} />
            <Route path="/geschiedenis" element={<History />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/artiesten" element={<ArtistsOverview />} />
            <Route path="/artiest/:id" element={<ArtistDetail />} />
            <Route path="/adminpage" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
            <Route path="/adminsongs" element={<ProtectedRoute role="admin"><SongsAdmin /></ProtectedRoute>} />
            <Route path="/adminartists" element={<ProtectedRoute role="admin"><ArtistAdmin /></ProtectedRoute>} />

            {/* Statistics */}
            <Route path="/statistieken/zelfde-positie" element={<SamePosition />} />
            <Route path="/statistieken/top-artiesten" element={<BestArtists />} />
            <Route path="/statistieken/alle-liedjes" element={<Top2000AllEntries />} />
            <Route path="/statistieken/een-vermelding" element={<OnceInTop2000 />} />
          <Route path="/songoverview" element={<Songoverview />} />
          <Route path="/statistieken/grootste-dalers" element={<Dalers/>}/>
          <Route path="/statistieken/grootste-stijgers" element={<Stijgers/>}/>
          <Route path="/statistieken/verdwenen" element={<Verdwenen/>}/>
        </Routes>
      </main>

      <footer className="mt-auto w-100">
          <Footer/>
      </footer>
    </div>
    </AuthProvider>
  )
}

export default App