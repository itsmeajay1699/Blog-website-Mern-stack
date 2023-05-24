import { useNavigate } from "react-router-dom";
import "./header.scss";
import Utils from "../../utils/Contant";
const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header className="header1">
      <div className="max-width">
        <div className="logo">
          <img onClick={() => navigate("/")} src={Utils.blogLogo} alt="logo" />
          {user && <span className="name1">Welcome {user.name}</span>}
        </div>
        <ul className="menuItems">
          {user && (
            <>
              <li
                className="menuItem1"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
