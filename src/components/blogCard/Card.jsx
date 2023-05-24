import { useEffect, useState } from "react";
import Utils from "../../utils/Contant";
import "./card.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setPost } from "../../slice/postSlice";
// eslint-disable-next-line react/prop-types
const BlogCard = ({ item, setPosts }) => {
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (item.photo.data.data) {
      const base64 = btoa(
        // eslint-disable-next-line react/prop-types
        new Uint8Array(item.photo.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImg("data:image/png;base64," + base64);
    }
    // eslint-disable-next-line react/prop-types
  }, [item.photo.data.data]);

  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  // eslint-disable-next-line react/prop-types
  const check = item.likes.filter((like) => like._id === user._id);
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
  };

  const deleteBlog = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.delete(
        `https://blog-7vou.onrender.com/api/v1/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog deleted successfully");
      fetchPosts();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const likePost = async (id) => {
    try {
      const res = await axios.get(
        `https://blog-7vou.onrender.com/api/v1/posts/like/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fetchPosts();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handlePost = () => {
    dispatch(setPost(item));
  };

  return (
    <Link className="card">
      <Toaster />
      <Link
        onClick={handlePost}
        // eslint-disable-next-line react/prop-types
        to={`/description-page/${item._id}`}
        state={item}
        className="img-container"
      >
        <img className="card-img" src={img} alt="" />
      </Link>
      <Link
        onClick={handlePost}
        // eslint-disable-next-line react/prop-types
        to={`/description-page/${item._id}`}
        className="card-body"
      >
        <div className="title">
          {/* eslint-disable-next-line react/prop-types */}
          <h3>{item.title}</h3>
        </div>
        <div className="subtitle">
          {/* eslint-disable-next-line react/prop-types */}
          <h4>{item.subtitle}</h4>
        </div>
        <div className="desc">
          {/* eslint-disable-next-line react/prop-types */}
          <p>{item.description}</p>
        </div>
      </Link>

      <div className="autor">
        <div className="author-img">
          <img src={Utils.blogImg} alt="" />
          <div className="author-about">
            {/* eslint-disable-next-line react/prop-types */}
            <h5>{item.userId.name}</h5>
            {/* eslint-disable-next-line react/prop-types */}
            <h6>{new Date(item.createdAt).toLocaleDateString()}</h6>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {
            <div className="like posi">
              {check.length > 0 ? (
                // eslint-disable-next-line react/prop-types
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {/* eslint-disable-next-line react/prop-types */}
                  <span className="like-count">{item.likes.length}</span>
                  {/* eslint-disable-next-line react/prop-types */}
                  <FcLike onClick={() => likePost(item._id)} />
                </div>
              ) : (
                // eslint-disable-next-line react/prop-types
                <FcLikePlaceholder onClick={() => likePost(item._id)} />
              )}
            </div>
          }
          {/* eslint-disable-next-line react/prop-types */}
          {user && user._id === item.userId._id && (
            // eslint-disable-next-line react/prop-types
            <div onClick={() => deleteBlog(item._id)} className="trash">
              <FaTrashAlt />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
