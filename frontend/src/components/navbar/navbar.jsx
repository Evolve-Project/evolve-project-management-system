import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { onLogout } from "@/api/authApi";
import { unauthenticateUser } from "@/redux/slices/authslice";
import { useState } from "react";
import styled from 'styled-components'
import { menuItems1 } from "./menuItems";
import avatar from "@/asserts/img/avatar.png"
import { signout } from "./Icons";
const Navbar = ({active, setActive,menuItems}) => {
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
    // <nav className='navbar navbar-light bg-light'>
    //     <div className='flex flex-row justify-between items-center'>
    //         <div>
    //             <NavLink to='/' className="m-2">
    //                 Home
    //             </NavLink>
    //         </div>

    //         {isAuth ? (
    //             <div className="flex  flex-row items-center">
    //                 currentUser = {role}
    //                 <Button onClick={logoutUser} className="m-2"> Logout</Button>
    //             </div>
    //         ) : (
    //             <div>
    //                 <NavLink to='/login'>
    //                     <span>Login</span>
    //                 </NavLink>

    //                 <NavLink to='/register' className='mx-3'>
    //                     <span>Register</span>
    //                 </NavLink>
    //             </div>
    //         )}
    //     </div>
    // </nav>

    <NavStyled>
      <div>
        <h1 className="text-3xl pl-12">Admin</h1>
      </div>
      <ul className="menu-items">
        {menuItems1.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      {isAuth ? (
        <div className="pt-24">
        <div className="bottom-nav">
          <div className="user-con bottom-nav">
            <img src={avatar} alt="" />
            <div className="text">
              <h2>Mike</h2>
              <p>{role}</p>
            </div>
          </div>
          <div className="pt-2 pl-4">
            <div className="pt-2 ">
              <Button onClick={logoutUser}>{signout} Sign Out</Button>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <div>
          <NavLink to="/login">
            <span>Login</span>
          </NavLink>
          <NavLink to="/register" className="mx-3">
            <span>Register</span>
          </NavLink>
        </div>
      )}
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: #7b76f1 !important;
    i {
      color: #7b76f1 !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navbar;
