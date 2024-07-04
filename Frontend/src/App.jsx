import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WordToPdf from './components/WordToPdf'
import ImageToPDF from "./components/ImageToPdf";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WordToPdf/>} />
        <Route path="/image-to-pdf" element={<ImageToPDF/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

