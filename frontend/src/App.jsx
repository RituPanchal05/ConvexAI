import { signInWithPopup } from 'firebase/auth'
import react from 'react'
import { auth, googleProvider } from '../utils/firebase'
import api from '../utils/axios'

function App() {

  const handleLogin = async (token) => {
  try {
    console.log("Sending token to backend...");

    const { data } = await api.post("/auth/login", { token });

    console.log("Backend Response:", data);
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Message:", error.message);
  }
};

  const googleLogin = async () => {
  try {
    console.log("1. Opening Google Popup...");

    const data = await signInWithPopup(auth, googleProvider);
    console.log("2. Google Login Success");

    const token = await data.user.getIdToken();
    console.log("3. Token:", token);

    await handleLogin(token);
    console.log("4. Backend Login Success");

    console.log(data);
  } catch (error) {
    console.error("Google Login Error:", error);
  }
};

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button className='w-50 h-24 bg-white' onClick={googleLogin}>
        continue with google
      </button>
    </div>
  )
}

export default App