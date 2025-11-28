import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // <-- added
import { auth } from "../../utils/firebase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // <-- added

  const oobCode = new URLSearchParams(window.location.search).get("oobCode");
  const email = new URLSearchParams(window.location.search).get("email");

  const handleReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("Password updated successfully! Redirecting to login...");

      // Redirect to login page after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-gray-100">

      <div className="
        w-full max-w-xl bg-white rounded-3xl 
        shadow-[0px_20px_60px_rgba(0,0,0,0.08)] 
        p-12 animate-[fadeIn_0.5s_ease]
        ">

        <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-700">
          Reset Password
        </h1>

        <p className="text-center text-gray-700 mt-1 mb-10 text-lg">
          for <span className="font-semibold text-black">{email}</span>
        </p>

        <div className="relative mb-8">
          <input
            type={show ? "text" : "password"}
            placeholder="New password"
            className="
              w-full px-5 py-3 pr-14 rounded-xl border border-gray-300  
              transition-all text-gray-900 placeholder-gray-400 
              shadow-sm
            "
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="
              absolute right-4 top-3.5 text-gray-600 
              hover:text-black text-xl select-none transition
            "
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          onClick={handleReset}
          className="
            w-full bg-gray-700 text-white text-lg font-semibold 
            py-3.5 rounded-xl shadow-md hover:bg-gray-900 
            transition-all active:scale-[0.98]
          "
        >
          Save Password
        </button>

        {message && (
          <p className="
            mt-6 text-center bg-gray-100 text-gray-800 
            py-3 rounded-xl shadow-sm
          ">
            {message}
          </p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
