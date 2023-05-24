import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";

// eslint-disable-next-line react/prop-types
const ProtectHomePage = ({ setIsLoaded, setPosts }) => {
  const [ok, setOk] = React.useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://blog-7vou.onrender.com/api/v1/posts/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(res.data);
      setIsLoaded(false);
    };
    fetchPosts();
  }, []);
  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      axios
        .get("https://blog-7vou.onrender.com/api/v1/auth/protect/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setOk(res.data.ok);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOk(true);
  }, []);

  return ok ? <Outlet /> : <Spinner />;
};

export default ProtectHomePage;
