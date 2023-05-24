import { useState } from "react";
import axios from "axios";
import "./loginPage.css";
import { NavLink } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import avatar from "../../assets/avatar.svg";
import bg from "../../assets/bg.svg";
import wave from "../../assets/wave.png";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://blog-7vou.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      toast.success("Logged In Successfully");
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div>
        <Toaster />
        <img className="wave" src={wave} />
        <div className="container">
          <div className="img">
            <img src={bg} />
          </div>
          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <img src={avatar} />
              <h2 className="title">Welcome</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user" />
                </div>
                <div className="div">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@gmail.com"
                    className="input"
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock" />
                </div>
                <div className="div postition-rel">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="input"
                  />
                  {
                    <span
                      className="position-absolute"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </span>
                  }
                </div>
              </div>
              <NavLink
                className="login__forgot__password__link"
                to="/forgot-password"
              >
                Forgot Password?
              </NavLink>
              <input type="submit" className="btn" defaultValue="Login" />
              <div className="login__register__link__container">
                <span className="login__register__link">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account?{" "}
                  <NavLink className="sign-up-btn" to="/signup">
                    Sign Up
                  </NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
