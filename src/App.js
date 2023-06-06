import logo from './logo.svg';
import './App.css';
import Home from "../src/Components/Home/Home";
import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Laborant from "../src/Components/Laborant/Laborant"


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path ="/" element={<Home></Home>}></Route>
        <Route exact path ="/laborant"  element={<Laborant></Laborant>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
