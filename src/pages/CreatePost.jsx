import { useContext, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const addCategory = () => {
    if (cat.trim()) {
      setCats([...cats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

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
        .form-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glow-input {
          transition: all 0.3s ease;
        }
        .glow-input:focus {
          box-shadow: 0 0 10px rgba(94, 234, 212, 0.5);
          border-color: #5eead4;
        }
        .category-chip {
          transition: transform 0.2s ease;
        }
        .category-chip:hover {
          transform: scale(1.05);
        }
      `}</style>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <Navbar />
      <div className="px-6 md:px-[150px] py-12 relative z-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-teal-300 transition-colors"
          >
            <IoArrowBack className="mr-2" />
            Back
          </button>
        </div>
        <div className="form-container rounded-2xl p-8 shadow-2xl">
          <h1 className="font-bold text-3xl text-white mb-8 text-center bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
            Create a New Post
          </h1>
          <form className="w-full flex flex-col space-y-6">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="glow-input outline-none px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4 py-2 text-white file:bg-teal-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-4">
                <input
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="glow-input outline-none px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
                  type="text"
                  placeholder="Enter post category"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="bg-teal-500 text-white px-4 py-3 font-semibold rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {cats?.map((c, i) => (
                  <div
                    key={i}
                    className="category-chip flex items-center space-x-2 bg-teal-600 text-white px-3 py-1 rounded-full"
                  >
                    <p>{c}</p>
                    <p
                      onClick={() => deleteCategory(i)}
                      className="text-gray-800 bg-white rounded-full cursor-pointer p-1 text-sm"
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={15}
              className="glow-input px-4 py-3 outline-none bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
              placeholder="Enter post description"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCreate}
                className="w-full md:w-[20%] text-white bg-teal-500 font-semibold px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Create
              </button>
              <button
                onClick={handleCancel}
                className="w-full md:w-[20%] text-white bg-gray-600 font-semibold px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;