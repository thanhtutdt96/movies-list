import React from 'react';
import 'App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from "react-router-dom";
import MovieDetails from 'pages/MovieDetails';
import Home from 'pages/Home';


function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
      </div>
  );
}

export default App;
