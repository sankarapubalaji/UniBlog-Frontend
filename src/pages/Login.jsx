import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/"); // Redirect to Home page to show all posts
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <style>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.3);
          animation: drift 20s infinite;
          pointer-events: none;
        }
        .particle:nth-child(1) {
          width: 30px;
          height: 30px;
          left: 20%;
          animation-duration: 18s;
          animation-delay: 0s;
        }
        .particle:nth-child(2) {
          width: 50px;
          height: 50px;
          left: 40%;
          animation-duration: 22s;
          animation-delay: 2s;
        }
        .particle:nth-child(3) {
          width: 40px;
          height: 40px;
          left: 60%;
          animation-duration: 20s;
          animation-delay: 4s;
        }
        .particle:nth-child(4) {
          width: 35px;
          height: 35px;
          left: 80%;
          animation-duration: 24s;
          animation-delay: 6s;
        }
        @keyframes drift {
          0% {
            transform: translateY(100vh) scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(1.1);
            opacity: 0.2;
          }
        }
        .login-card {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 relative overflow-hidden">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>

        <div className="flex items-center justify-between px-6 md:px-[150px] py-4 bg-gray-800 bg-opacity-80 backdrop-blur-md relative z-10">
          <h1 className="text-xl md:text-2xl font-bold text-white hover:text-teal-300 transition-colors">
            <Link to="/">Uni Blog</Link>
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/register"
              className="text-white hover:text-teal-300 font-semibold transition-colors"
            >
              Register
            </Link>
            <Link
              to="/"
              className="text-white hover:text-teal-300 font-semibold transition-colors"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="w-full flex justify-center items-center min-h-[80vh] relative z-10">
          <div className="flex flex-col justify-center items-center space-y-6 w-[90%] max-w-md bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl login-card">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 text-center">Log in to your Uni Blog account</p>

            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Email address"
              type="text"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Password"
              type="password"
            />

            <button
              onClick={handleLogin}
              className="w-full px-4 py-3 text-lg font-semibold bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-md"
            >
              Log In
            </button>

            {error && (
              <p className="text-red-500 text-sm font-medium">
                Invalid email or password
              </p>
            )}

            <div className="flex flex-col items-center space-y-2">
              <p className="text-gray-600">Don't have an account?</p>
              <Link
                to="/register"
                className="text-teal-500 hover:text-teal-600 font-semibold transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;