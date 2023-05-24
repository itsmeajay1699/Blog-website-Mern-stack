import "./createPage.css";
import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(image);
    formData.append("title", title);
    formData.append("subtitle", content);
    formData.append("description", description);
    formData.append("photo", image);
    try {
      axios
        .post("https://blog-7vou.onrender.com/api/v1/posts/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Post Created Successfully");
        })
        .catch((err) => {
          console.log(1);
          toast.error(err.response.data.error);
        });
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="create-page">
        <form onSubmit={handleSubmit} className="form">
          <div className="header">Create Post</div>
          <div className="inputs">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="input"
              type="text"
            />
            <textarea
              rows="3"
              cols="50"
              placeholder="Content"
              className="input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
            <input
              type="file"
              className="input1"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="sigin-btn">Create Post</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePage;
