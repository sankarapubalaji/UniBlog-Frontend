import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg w-[200px] z-10 flex flex-col items-start absolute top-0 right-0 rounded-md p-4 space-y-4 border border-gray-600">
      {!user && (
        <h3 className="text-white text-sm hover:text-teal-400 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-teal-400 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-teal-400 cursor-pointer">
          <Link to={`/profile/${user._id}`}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-teal-400 cursor-pointer">
          <Link to={`/myblogs/${user._id}`}>My Blogs</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-teal-400 cursor-pointer">
          <Link to="/contact">Contact Us</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-teal-400 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;