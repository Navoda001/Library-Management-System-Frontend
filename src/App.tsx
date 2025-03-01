import React from 'react';
import logo from './logo.svg';
// import './App.css';
import  NavBar  from "./components/NavBar";
import { BookConsole } from './components/book/BookConsole';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <BookConsole/>
    </div>
  );
}

export default App;
