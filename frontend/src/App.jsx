import { signInWithPopup } from 'firebase/auth'
import react, { useEffect } from 'react'
import { auth, googleProvider } from '../utils/firebase'
import api from '../utils/axios'
import Home from './pages/Home'
import getCurrentUser from './features/getCurrentUser'

function App() {
useEffect(() => {
  const getUser=async () => {
    await getCurrentUser()
  }
  getUser()
},[])
  return (
    <>
      <Home/>
    </>
  )
}

export default App