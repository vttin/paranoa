import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Page1 from "./pages/Page1"
import Page2 from "./pages/Page2"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={<ProtectedRoute />} >

            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
          </Route>



        </Routes>
      </Router>
    </>
  )
}

export default App
