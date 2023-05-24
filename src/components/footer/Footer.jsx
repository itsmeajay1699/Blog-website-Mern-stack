import "./footer.scss";
import { BsInstagram } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";
import Utils from "../../utils/Contant";
const Footer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="footer-wrapper">
      <div className="footer-items">
        <div className="first">
          <img src={Utils.blogLogo} className="img1" alt="footer-logo" />
          <span className="span">Hi {user ? user.name : "Guest"}</span>
        </div>
        <div className="second">
          <h3>The Basics</h3>
          <ul>
            <li>About BLog</li>
            <li>Contact Us</li>
            <li>Support Forums</li>
            <li>Api</li>
            <li>System Status</li>
          </ul>
        </div>
        <div className="third">
          <h3>GET INVOLVED</h3>
          <ul>
            <li>Contribution Bible</li>
            <Link className="link-post" to="/createPost">
              Add New Posts
            </Link>
          </ul>
        </div>
        <div className="forth">
          <h3>COMMUNITY</h3>
          <ul>
            <li>Guidelines</li>
            <li>Discussions</li>
            <li>Leaderboard</li>
            <li>Twiter</li>
          </ul>
        </div>
      </div>
      <div className="icons">
        <BsInstagram className="ig-icon" />
        <AiFillGithub
          onClick={() => window.open("https://github.com/itsmeajay1699")}
          className="git-icon"
        />
        <AiFillLinkedin className="li-icon" />
      </div>
    </div>
  );
};

export default Footer;
