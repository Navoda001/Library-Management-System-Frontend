import React from 'react';
import logo from './logo.svg';
// import './App.css';
import  NavBar  from "./components/NavBar";
import { BookConsole } from './components/book/BookConsole';import { MemberConsole } from './components/member/MemberConsole';
import { StaffMemberConsole } from './components/Staff/StaffMemberConsole';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <StaffMemberConsole/>
      <BookConsole/>
      <MemberConsole/>

    </div>
  );
}

export default App;
