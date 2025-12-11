import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"

function App() {
  return (
    <div className={" d-flex flex-column min-vh-100"}>
      <Navbar />

      <main className={"flex-fill"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>

        <div className={"fixed-bottom mt-3"}>
            {/* <Footer/> */}

        </div>
    </div>
  )
}

export default App
