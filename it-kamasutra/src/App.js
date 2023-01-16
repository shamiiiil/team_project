import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import FrontPage from "./pages/FrontPage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddPostPage from "./pages/AddPostPage";
import MyPosts from "./pages/MyPosts";
import OnePost from "./pages/OnePost";

const App = () => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, [user]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/add-post" element={<AddPostPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-posts" element={<MyPosts/>}/>
          <Route path="/my-posts/:id" element={<OnePost/>}/>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
