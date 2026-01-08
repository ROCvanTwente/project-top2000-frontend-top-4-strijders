import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Openingsact from "./pages/Openingsact"

function App() {
    fetch('https://localhost:7003/api/GetTopFive')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
  return (
    <div className={" d-flex flex-column min-vh-100"}>
      <Navbar />

      <main className={"flex-fill"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/openingsact" element={< Openingsact/>} />
        </Routes>
      </main>

        <div className={"mt-5 w-100"}>
            <Footer/>
        </div>
    </div>
  )
}

export default App
