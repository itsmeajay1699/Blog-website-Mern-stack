import "./descriptionPage.scss";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/header/Header";
import { setPost } from "../../slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import Loader from "../../components/loader/Loader";
const DetailPageBanner = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const post1 = useSelector((state) => state.post.Post);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [img, setImg] = useState("");
  const [comment, setComment] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPosts = async () => {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.get(
      "https://blog-7vou.onrender.com/api/v1/posts/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const postById = res.data.filter((post) => post._id === id);

    dispatch(setPost(postById[0]));
  };

  const makeComment = async (postId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        `https://blog-7vou.onrender.com/api/v1/posts/comment/${postId}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
      fetchPosts();
      // cal a function in 2 sec
      setTimeout(() => {
        toast.success("Comment added successfully");
        handleModal();
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleSubmit = (id) => {
    try {
      axios
        .patch(
          `https://blog-7vou.onrender.com/api/v1/posts/${id}`,
          {
            title,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          fetchPosts();
          setTimeout(() => {
            toast.success("Post updated successfully");
            handleUpdate();
          }, 1000);
        })
        .catch((err) => {
          console.log(1);
          toast.error(err.response.data.error);
        });
    } catch (err) {
      // eslint-disable-next-line no-unused-vars
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchPosts();
    if (post1?.photo?.data?.data) {
      const base64 = btoa(
        new Uint8Array(post1?.photo?.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImg("data:image/png;base64," + base64);
    }
  }, [Object.keys(post1).length > 0]);
  // post is empty so we need to check if post is empty or not
  return Object.keys(post1).length > 0 ? (
    <>
      <Header />
      <div className="detail-banner">
        <Toaster />
        <img src={img} className="bg-img" />
        <div className="opac"></div>
        <div className="detail-banner-items">
          <div className="movie-img-container">
            <img src={img} alt="" />
            <div className="opac1"></div>
          </div>
          <div className="movie-detail-container">
            <h1 className="title">{post1?.title}</h1>
            <p>{post1?.subtitle}</p>
            <h2>Details</h2>
            <p className="des">{post1?.description}</p>
            {user._id == post1?.userId?._id && (
              <button onClick={handleUpdate} className="update-btn">
                Update <MdEdit />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="comment-header">
        <h1 className="comment-title">Comments</h1>
      </div>
      {post1?.comments?.length > 0 ? (
        post1?.comments.map((comment, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className="comment-section">
              <div className="comment-container">
                <div className="comment-body">
                  <div className="comment">
                    <span className="index-btn">{index + 1}</span>
                    <div className="comment-detail">
                      <h1>{comment.name}</h1>
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="comment-header">
          <h4 className="comment-title1">
            No comments yet, be the first to comment
          </h4>
        </div>
      )}

      <button onClick={handleModal} className="comment-btn">
        Write a comment
      </button>
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-header">
              <h1 className="modal-title">Write a comment</h1>
            </div>
            <div className="close-btn">
              <MdClose onClick={handleModal} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(post1?._id);
              }}
              className="modal-form"
              action=""
            >
              <textarea
                style={{
                  resize: "none",
                  outline: "none",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                className="modal-textarea"
                cols="30"
                rows="10"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment"
              ></textarea>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {update && (
        <div className="modal-container">
          <div className="modal1">
            <div className="close-btn">
              <MdClose onClick={handleUpdate} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(post1?._id);
              }}
              className="form"
            >
              <div className="header">Update Post</div>
              <div className="inputs">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="input"
                  type="text"
                />
                <textarea
                  rows="6"
                  cols="50"
                  placeholder="description"
                  className="input"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit" className="sigin-btn">
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  ) : (
    <Loader />
  );
};
// PG 04/07/2023 (IN) Animation, Adventure, Family, Fantasy, Comedy 1h 34m
export default DetailPageBanner;
