import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Openingsact from "./pages/Openingsact"
import Playlists from "./pages/Playlists.jsx";
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";
//
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./routes/ProtectedRoute.jsx"
//

function App() {
  return (
    <AuthProvider>
      <div className={" d-flex flex-column min-vh-100"}>
        <Navbar />

        <main className={"flex-fill"}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/openingsact" element={< Openingsact />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          </Routes>
        </main>

        <div className={"mt-5 w-100"}>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
