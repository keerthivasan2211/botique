import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Configuration (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAw5OA_e71KvcBQhU7FInLDquEhxLLq7kQ",
  authDomain: "botique-sri.firebaseapp.com",
  projectId: "botique-sri",
  storageBucket: "botique-sri.appspot.com",
  messagingSenderId: "994438525456",
  appId: "1:994438525456:web:3d6ccfa2de90f781bb9095",
  measurementId: "G-81RXRKTQJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null); // Store user details in state
  const navigate = useNavigate();

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setUserInfo({ 
        name: user.displayName || "User", 
        email: user.email, 
        image: user.photoURL || "https://via.placeholder.com/40"
      });

      console.log("User logged in successfully:", user);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setUserInfo({ 
        name: user.displayName, 
        email: user.email, 
        image: user.photoURL 
      });

      console.log("Google Login successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Google Login failed:", error.message);
      setError("Google login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Show user details if logged in */}
        {userInfo ? (
          <div className="text-center">
            <img src={userInfo.image} alt="User" className="w-16 h-16 rounded-full mx-auto mb-2" />
            <p className="font-bold">{userInfo.name}</p>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        ) : (
          <>
            {/* Email/Password Login Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition">
                Login
              </button>
            </form>

            {/* Google Login Button */}
            <div className="mt-4 text-center">
              <button 
                onClick={handleGoogleLogin} 
                className="bg-red-600 text-white p-2 rounded-lg w-full flex justify-center items-center gap-2 hover:bg-red-500 transition"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
                  alt="Google Logo" className="w-5 h-5" />
                Login with Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
