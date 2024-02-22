import { Link, NavLink,useLocation } from "react-router-dom";
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
  const location = useLocation();
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
    <aside className="h-screen">
    <nav className="h-full flex flex-col bg-white border-r shadow-sm ">
      <div className="p-4 pb-2 flex  items-center">
        <h1 className="text-4xl ">{role}</h1>
      </div>

      {/* <ul className="menu-items flex-1 flex flex-col">
        {item.map((item) => (
          <li
            key={item.id}
            className={`grid items-center gap-2 mx-6 my-1 font-semibold cursor-pointer transition-colors ${
              active === item.id ? "text-purple-700" : "text-gray-600"
            }`}
          >
            {item.icon}
            <Link to={item.link}>{item.title}</Link>
          
          </li>
        ))}
      </ul> */}
      <ul className="flex-1 px-3">
        {item.map((item) => (
          <li
            key={item.id}
            className={` relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group ${
              location.pathname === item.link  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
            }`}
          >
            {item.icon}
           <span className="w-52 ml-3"><NavLink to={item.link}>{item.title}</NavLink></span> 
          </li>
        ))}
      </ul>
      {isAuth ? (
        <div className="pt-24">
          <div className="">
            <div className="flex items-center gap-4">
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
    </aside>
  );
};

export default Navbar;
