import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
const Spinner = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      navigate("/login");
    }
    return () => clearInterval(timer);
  }, [counter, navigate]);
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <div className="moon">
          <img
            className="moon-img"
            src="https://png.pngtree.com/png-clipart/20210330/ourlarge/pngtree-astronaut-sitting-in-the-moon-png-image_3165017.jpg"
            alt=""
          />
          <img
            className="half-moon-img"
            src="https://static.vecteezy.com/system/resources/previews/017/178/226/original/crescent-moon-icon-isolated-on-transparent-background-free-png.png"
            alt=""
          />
        </div>
        <h2>Please Login</h2>
        <h1>You are redirecting in {counter} </h1>
      </div>
    </div>
  );
};

export default Spinner;
