import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import NotFound from './components/notFound/NotFound'
import Protected from "./components/routes/protected/Protected"

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  }

  const handleLogout = () => {
    setIsSignedIn(false);
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<Navigate to='login' />} />
          <Route path="login" element={<Login onLogin={handleSignIn} />} />
          <Route element={<Protected isSignedIn={isSignedIn} />}>
            <Route path="/dashboard/*" element={<Dashboard onLogout={handleLogout} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
