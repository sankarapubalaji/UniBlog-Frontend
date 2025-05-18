import HomePosts from "../components/HomePosts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import blogIcon from "../assets/blog-icon.png";
import blogIcon2 from "../assets/blog-icon2.png";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

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

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spinPulse {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: rotate(180deg) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 0.8;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          60% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .welcome-heading {
          animation: fadeIn 1s ease-out forwards;
          background: linear-gradient(to right, #5eead4, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-content {
          animation: fadeIn 1.2s ease-out forwards;
          animation-delay: 0.2s;
        }

        .join-button {
          animation: bounceIn 1s ease-out forwards;
          animation-delay: 0.4s;
          background: linear-gradient(to right, #5eead4, #34d399);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .join-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.5);
        }

        .blog-icon {
          animation: spinPulse 4s ease-in-out infinite;
        }

        .blog-icon2 {
          animation: spinPulse 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 relative overflow-hidden flex flex-col">
        {/* Particle Elements */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>

        <Navbar />

        <div className="relative z-10">
          {/* Welcome Section - Hidden for Logged-in Users */}
          {!user && (
            <div className="flex-1 flex items-center justify-center px-6 md:px-[200px] py-12">
              <div className="flex flex-col md:flex-row items-center w-full gap-8">
                <div className="text-center md:text-left text-white max-w-xl">
                  <h1 className="welcome-heading text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                    Welcome to Uni Blog
                  </h1>
                  <p className="welcome-content text-lg md:text-xl mb-8 leading-relaxed text-gray-300">
                    Dive into a world of exciting blogs, share your thoughts, and connect with a vibrant community. Start creating your own blog today!
                  </p>
                  <Link to="/register">
                    <button className="join-button text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg">
                      Join Now
                    </button>
                  </Link>
                </div>
                <div className="hidden md:flex flex-col space-y-6 justify-center">
                  <img
                    src={blogIcon}
                    alt="Blog Icon 1"
                    className="blog-icon w-48 h-48 md:w-64 md:h-64 object-contain"
                  />
                  <img
                    src={blogIcon2}
                    alt="Blog Icon 2"
                    className="blog-icon2 w-48 h-48 md:w-64 md:h-64 object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Latest Posts Section - Always Visible */}
          <div className="px-6 md:px-[150px] py-12">
            <h2 className="text-3xl font-bold text-white mb-8">Latest Posts</h2>
            {loader ? (
              <div className="h-[40vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : !noResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    to={user ? `/posts/post/${post._id}` : "/login"}
                  >
                    <HomePosts post={post} />
                  </Link>
                ))}
              </div>
            ) : (
              <h3 className="text-center text-white font-bold mt-16">
                No posts available
              </h3>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;