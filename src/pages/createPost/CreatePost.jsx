import "./createPage.css";
import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [fileSelected, setImage] = useState("");
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", "vzz1kzak");
    console.log(formData);
    try {
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dijipxpe6/image/upload",
          formData
        )
        .then((res) => {
          console.log(res.data.url);
          axios
            .post(
              "https://da-u3xo.onrender.com/api/v1/posts/create",
              {
                title: title,
                subtitle: content,
                description: description,
                photo: res.data.url,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              toast.success("Post Created Successfully");
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
              toast.error("server error2");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Sever Error");
        });
    } catch (error) {
      console.log(error);
      toast.error("server error3");
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
