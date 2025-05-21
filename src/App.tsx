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
import { SignUp } from './components/auth/Signup';
import { SignIn } from './components/auth/SignIn';
import { AuthProvider } from './components/auth/AuthProvider';
import { UnAuth } from './components/auth/UnAuth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
           <Route path="/" element = {<SignIn/>}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book" element={<BookConsole />} />
          <Route path="/member" element={<MemberConsole />} />
          <Route path="/staff" element={<StaffMemberConsole />} />
          <Route path="/lending" element={<LendingConsole />} />
          <Route path="/*" element={<NotFound />} />
          <Route path= "/unauth" element = {<UnAuth/>}/>
        </Routes>
        </AuthProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
