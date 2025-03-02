import React from 'react';
import logo from './logo.svg';
// import './App.css';
import NavBar from "./components/NavBar";
import { BookConsole } from './components/book/BookConsole';
import { MemberConsole } from './components/member/MemberConsole';
import { StaffMemberConsole } from './components/Staff/StaffMemberConsole';
import { LendingConsole } from './components/lendings/LendingConsole';
import { BrowserRouter, Route, Routes } from 'react-router';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<BookConsole />} />
          <Route path="/book" element={<BookConsole />} />
          <Route path="/member" element={<MemberConsole />} />
          <Route path="/staff" element={<StaffMemberConsole />} />
          <Route path="/lending" element={<LendingConsole />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
