import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { IoArrowBack } from "react-icons/io5";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
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
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = () => {
    if (cat.trim()) {
      setCats([...cats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

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
        <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-6">
          <h1 className="font-bold text-2xl text-gray-800 mb-6">Update a Post</h1>
          <form className="w-full flex flex-col space-y-6">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter post title"
              className="outline-none px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4 py-2 text-gray-600"
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-4">
                <input
                  onChange={(e) => setCat(e.target.value)}
                  value={cat}
                  className="outline-none px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
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
                    className="flex items-center space-x-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-md"
                  >
                    <p>{c}</p>
                    <p
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-teal-500 rounded-full cursor-pointer p-1 text-sm"
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={15}
              className="px-4 py-3 outline-none bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
              placeholder="Enter post description"
            />
            <button
              onClick={handleUpdate}
              className="w-full md:w-[20%] mx-auto text-white bg-teal-500 font-semibold px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;