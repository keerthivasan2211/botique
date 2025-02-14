import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { Navbar } from "./Nav"; // ✅ Correct for named exports


const firebaseConfig = {
  apiKey: "AIzaSyAw5OA_e71KvcBQhU7FInLDquEhxLLq7kQ",
  authDomain: "botique-sri.firebaseapp.com",
  projectId: "botique-sri",
  storageBucket: "botique-sri.appspot.com",
  messagingSenderId: "994438525456",
  appId: "1:994438525456:web:3d6ccfa2de90f781bb9095",
  measurementId: "G-81RXRKTQJN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User",
          email: currentUser.email,
          photoURL: currentUser.photoURL || "/default-avatar.png",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const newUser = userCredential.user;

      await axios.post("https://botique-backend.onrender.com/api/signup", {
        name: formData.name,
        email: newUser.email,
      });

      alert("Signup successful!");
    } catch (error) {
      alert("Signup Failed: " + error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      await axios.post("https://botique-backend.onrender.com/google-signup", {
        name: googleUser.displayName,
        email: googleUser.email,
        uid: googleUser.uid,
      });

      alert(`Welcome, ${googleUser.displayName}!`);
    } catch (error) {
      alert("Google Sign-In Failed: " + error.message);
    }
  };

  return (
    <div>
      <Navbar user={user} /> {/* Navbar receives user details */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-2">Sign Up</button>
          <button type="button" onClick={handleGoogleSignup} className="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center">
            <img src="/google-logo.png" alt="Google Logo" className="w-5 h-5 mr-2" />Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
