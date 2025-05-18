import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL, IF } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/comments/create",
        { comment, author: user.username, postId, userId: user._id },
        { withCredentials: true }
      );
      setComment("");
      fetchPostComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    fetchPostComments();
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
        {loader ? (
          <div className="h-[80vh] flex justify-center items-center w-full">
            <Loader />
          </div>
        ) : (
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                {post.title}
              </h1>
              {user?._id === post?.userId && (
                <div className="flex items-center justify-center space-x-2">
                  <p className="cursor-pointer text-teal-500 hover:text-teal-600">
                    <BiEdit onClick={() => navigate("/edit/" + postId)} />
                  </p>
                  <p
                    className="cursor-pointer text-red-500 hover:text-red-600"
                    onClick={handleDeletePost}
                  >
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <p>@{post.username}</p>
              <div className="flex space-x-2">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
              </div>
            </div>

            <img
              src={IF + post.photo}
              alt=""
              className="w-full rounded-lg mb-6"
            />
            <p className="text-gray-700 leading-relaxed mb-6">{post.desc}</p>

            <div className="flex items-center space-x-4 font-semibold text-gray-800 mb-6">
              <p>Categories:</p>
              <div className="flex justify-center items-center space-x-2">
                {post.categories?.map((c, i) => (
                  <div
                    key={i}
                    className="bg-teal-100 text-teal-800 rounded-lg px-3 py-1"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Comments:
              </h3>
              {comments?.map((c) => (
                <Comment
                  key={c._id}
                  c={c}
                  post={post}
                  setComments={setComments}
                />
              ))}
            </div>

            {user && (
              <div className="w-full flex flex-col md:flex-row gap-4">
                <input
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  type="text"
                  placeholder="Write a comment"
                  className="md:w-[80%] outline-none px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
                />
                <button
                  onClick={postComment}
                  className="text-white bg-teal-500 px-4 py-3 md:w-[20%] rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;