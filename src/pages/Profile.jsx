import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import Loader from "../components/Loader";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const params = useParams().id;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await axios.get(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
      setError("Failed to load profile data.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchUserPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load posts.");
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    setError("");
    try {
      await axios.put(
        URL + "/api/users/" + user._id,
        { username, email },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setError("Failed to update profile. Please try again.");
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    setError("");
    try {
      await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Failed to delete account. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [user, params]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 relative overflow-hidden">
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
      `}</style>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <Navbar />
      <div className="px-6 md:px-[150px] py-12 min-h-[80vh] relative z-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-teal-300 transition-colors"
          >
            <IoArrowBack className="mr-2" />
            Back
          </button>
        </div>
        {loadingProfile ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-[30%] w-full mb-8 md:mb-0 md:sticky md:top-16">
              <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-6">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Profile</h1>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full outline-none px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 mb-4"
                  placeholder="Your username"
                  type="text"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full outline-none px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 mb-4"
                  placeholder="Your email"
                  type="email"
                />
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleUserUpdate}
                    className="text-white font-semibold bg-teal-500 px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleUserDelete}
                    className="text-white font-semibold bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
                {updated && (
                  <h3 className="text-green-500 text-sm text-center mt-4">
                    User updated successfully!
                  </h3>
                )}
                {error && (
                  <h3 className="text-red-500 text-sm text-center mt-4">
                    {error}
                  </h3>
                )}
              </div>
            </div>

            <div className="md:w-[70%] w-full">
              <h1 className="text-xl font-bold mb-4 text-white">Your Posts:</h1>
              {loadingPosts ? (
                <div className="h-[40vh] flex justify-center items-center">
                  <Loader />
                </div>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((p) => (
                    <div key={p._id}>
                      <ProfilePosts p={p} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white">No posts available.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;