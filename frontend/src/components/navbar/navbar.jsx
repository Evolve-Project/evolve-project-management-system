import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { onLogout } from "@/api/authApi";
import { unauthenticateUser } from "@/redux/slices/authslice";
import { useState } from "react";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.role);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());

      localStorage.setItem(
        "authData",
        JSON.stringify({ isAuth: false, role: null })
      );
    } catch (error) {
      console.log(error);
      // setError(error.response.data.errors[0].msg)
    }
  };
  return (
    <nav className="bg-custom-purple">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center flex-shrink-0 text-white">
          <NavLink to="/" className="m-2 font-semibold text-xl tracking-tight">
            Evolve
          </NavLink>
        </div>

        {isAuth ? (
          <div className="flex items-center">
            <span className="text-white">currentUser = {role}</span>
            <Button
              onClick={logoutUser}
              className="m-2 bg-custom-black
                         text-white "
            >
              {" "}
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <NavLink
              to="/login"
              className="text-gray-300 hover:text-white mr-4"
            >
              <span>Login</span>
            </NavLink>

            <NavLink to="/register" className="text-gray-300 hover:text-white">
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
