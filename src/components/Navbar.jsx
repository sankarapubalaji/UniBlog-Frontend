import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => setMenu(!menu);

  const handleSearch = (e) => {
    e.preventDefault();
    if (prompt) {
      navigate(`?search=${prompt}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-[150px] py-4 bg-gradient-to-r from-gray-900 to-black shadow-lg relative">
      <h1 className="text-lg md:text-xl font-extrabold text-white hover:text-teal-300 transition-colors">
        <Link to="/">Uni Blog</Link>
      </h1>

      {path === "/" && (
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center space-x-2 bg-gray-800 rounded-full px-3 py-1"
        >
          <button
            type="submit"
            className="cursor-pointer text-white hover:text-teal-300"
          >
            <BsSearch />
          </button>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="outline-none px-3 py-1 bg-transparent text-white placeholder-gray-400"
            placeholder="Search a post"
            type="text"
          />
        </form>
      )}

      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <>
            <h3>
              <Link
                to="/write"
                className="text-white hover:bg-gray-700 px-3 py-1 rounded-md transition-colors"
              >
                Create Blog
              </Link>
            </h3>
            <div onClick={showMenu} className="relative">
              <p className="cursor-pointer text-white hover:text-teal-300 text-xl">
                <IoMenu />
              </p>
              {menu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
                  <Menu />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h3>
              <Link
                to="/login"
                className="text-white hover:bg-gray-700 px-3 py-1 rounded-md transition-colors"
              >
                Login
              </Link>
            </h3>
            <h3>
              <Link
                to="/register"
                className="text-white hover:bg-gray-700 px-3 py-1 rounded-md transition-colors"
              >
                Register
              </Link>
            </h3>
          </>
        )}
      </div>

      <div onClick={showMenu} className="md:hidden text-xl relative">
        <p className="cursor-pointer text-white hover:text-teal-300">
          <IoMenu />
        </p>
        {menu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
            <Menu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;