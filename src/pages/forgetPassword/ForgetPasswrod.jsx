import "./forgetPassword.css";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgetPassword = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return toast.error("Password and Confirm Password does not match");
      }
      const response = await axios.patch(
        "https://blog-7vou.onrender.com/api/v1/auth/update-password",
        {
          email,
          password,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://blog-7vou.onrender.com/api/v1/auth/forget-password",
        {
          email,
        }
      );
      toast.success(response.data.message);
      setShow(response.data.success);
    } catch (error) {
      console.log(error.response.data.error);
      console.log(1);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="form-container-wrapper">
      <Toaster />
      <div className="form-container">
        <p className="title">Forget Password</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder
            />
          </div>
          {show && (
            <>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder
                />
                {
                  <span
                    className="position-absolute1"
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
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder
                />
              </div>
            </>
          )}
          {!show ? (
            <button type="submit" className="sign">
              confirm email
            </button>
          ) : (
            <button onClick={changePassword} className="sign">
              change password
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
