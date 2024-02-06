import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "../ui/button"
import { onLogout } from "@/api/authApi"
import { unauthenticateUser } from "@/redux/slices/authslice"
import { useState } from "react"


const Navbar = () => {
    const { isAuth } = useSelector((state) => state.auth)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const logoutUser = async () => {

        try {
            await onLogout()
            dispatch(unauthenticateUser())

            localStorage.setItem('isAuth', 'false')
        } catch (error) {
            console.log(error);
            // setError(error.response.data.errors[0].msg)
        }
    }
    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <div>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                </div>

                {isAuth ? (
                    <div>
                        <NavLink to='/dashboard' className='mx-3'>
                            Dashboard
                        </NavLink>
                        <Button onClick={logoutUser}> Logout</Button>
                    </div>
                ) : (
                    <div>
                        <NavLink to='/login'>
                            <span>Login</span>
                        </NavLink>

                        <NavLink to='/register' className='mx-3'>
                            <span>Register</span>
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
