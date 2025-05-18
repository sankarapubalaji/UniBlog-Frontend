// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import MyBlogs from "./pages/MyBlogs";
import ContactUs from "./pages/ContactUs";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/posts/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/myblogs/:id" element={<MyBlogs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;