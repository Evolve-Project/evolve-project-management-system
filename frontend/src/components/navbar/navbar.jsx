import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { onLogout } from "@/api/authApi";
import { unauthenticateUser } from "@/redux/slices/authslice";
import { useEffect, useState } from "react";

import { admin, mentor, mentee } from "./menuItems";

import avatar from "@/asserts/img/avatar.png";
import { signout } from "./Icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ active, setActive, menuItems }) => {
  const { isAuth, role } = useSelector((state) => state.auth);

  const [error, setError] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    if (role === "Admin") {
      setItem(admin);
    } else if (role === "Mentor") {
      setItem(mentor);
    } else {
      setItem(mentee);
    }
  }, [item]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());

      localStorage.setItem(
        "authData",
        JSON.stringify({ isAuth: false, role: null })
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="p-8 bg-white backdrop-blur-lg rounded-xl flex flex-col justify-between w-80 sticky top-0 left-0 h-full z-50">
      <div>
        <h1 className="text-4xl pl-6">{role}</h1>
      </div>

      <ul className="menu-items flex-1 flex flex-col">
        {item.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`grid items-center gap-2 mx-6 my-1 font-semibold cursor-pointer transition-colors ${
              active === item.id ? "text-purple-700" : "text-gray-600"
            }`}
          >
            {item.icon}
            <Link to={item.link}>{item.title}</Link>
            {/* <span>{item.title}</span> */}
          </li>
        ))}
      </ul>
      {isAuth ? (
        <div className="pt-24">
          <div className="bottom-nav">
            <div className="user-con bottom-nav flex items-center gap-4">
              <img
                src={avatar}
                alt=""
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="text">
                <h2 className="text-blue-900">Mike</h2>
                <p className="text-blue-600">{role}</p>
              </div>
            </div>
            <div className="pt-2 pl-4">
              <div className="pt-2">
                <Button onClick={logoutUser}>{signout} Sign Out</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <NavLink to="/login" className="mx-3 text-blue-900">
            <span>Login</span>
          </NavLink>
          <NavLink to="/register" className="mx-3 text-blue-900">
            <span>Register</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
