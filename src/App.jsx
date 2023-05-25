import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProtectHomePage from "./protectRoute/ProtectHomePage";
import CreatePage from "./pages/createPost/CreatePost";
import DescriptionPage from "./pages/descriptionPage/DescriptionPage";
import ForgetPassword from "./pages/forgetPassword/ForgetPasswrod";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLoaded, setIsLoaded] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://blog-7vou.onrender.com/api/v1/posts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data); 
      setIsLoaded(false);
    };
    fetchPosts();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectHomePage setPosts={setPosts} setIsLoaded={setIsLoaded} />
          }
        >
          <Route
            path=""
            element={
              <HomePage isLoaded={isLoaded} setIsLoaded={setIsLoaded} posts={posts} setPosts={setPosts} />
            }
          />
        </Route>
        <Route path="/createPost" element={<CreatePage />} />
        <Route
          path="/description-page/:id"
          element={<DescriptionPage setPosts={setPosts} />}
        />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
