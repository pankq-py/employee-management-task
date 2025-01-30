import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import AddEditEmployee from "./screens/AddEditEmployee";
import "./index.css";
import "./styles/Modals.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<AddEditEmployee />} />
        <Route path="/add" element={<AddEditEmployee />} />
        <Route path="/edit/:id" element={<AddEditEmployee />} />
      </Routes>
    </Router>
  )
}

export default App;
