import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Home() {
  // Accessing Data from Redux
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogin = async (token) => {
    try {
      console.log("Sending token to backend...");

      const { data } = await api.post("/api/auth/login", { token });

      dispatch(setUserData(data));

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
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="h-screen bg-[#0d0f14] text-white overflow-hidden">
      {/* Show Login Popup only if user is not logged in */}
      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to ConvexAI
              </h2>

              <p className="text-[13px] text-slate-500">
                Please login to continue using the app
              </p>
            </div>

            <button
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white py-[11px] text-sm font-medium text-black hover:shadow-lg transition-all"
              onClick={googleLogin}
            >
              <FcGoogle size={15} />
              Continue With Google
            </button>
          </div>
        </div>
      )}

      {/* Main App
      {userData && (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-3xl font-bold">
            Welcome {userData.name} 👋
          </h1>
        </div>
      )} */}
    </div>
  );
}

export default Home;