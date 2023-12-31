import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useCookies } from "react-cookie";
//import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "../components/User/User";

const Home = () => {
  const navigate = useNavigate();
  //const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  const { userData, setUserData } = useContext(UserContext);

  useEffect(()=>{
		if (userData) {
      setUsername(userData.username);
      toast(`Hello ${userData.username}`, {
        position: "top-right",
      });
    } else {
      navigate("/login");
    }
	}, [userData, navigate])

  /*
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "https://kh-global.onrender.com",
        {},
        { withCredentials: true }
      );
      console.log(data);
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  */

  const Logout = () => {
    //removeCookie("token");
    setUserData(null);
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome, <span>{username}</span>
        </h4>
        <h4>
          To
        </h4>
        <h4>
          <span id="k">K</span><span id="h">H</span> International
        </h4>
        <h4>
          Global Links Ltd.
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;