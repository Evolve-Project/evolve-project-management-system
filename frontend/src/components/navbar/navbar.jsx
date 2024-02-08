import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "../ui/button"
import { onLogout } from "@/api/authApi"
import { unauthenticateUser } from "@/redux/slices/authslice"
import { useState } from "react"


const Navbar = () => {
    const { isAuth } = useSelector((state) => state.auth)
    const role = useSelector(state => state.auth.role);
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const logoutUser = async () => {

        try {
            await onLogout()
            dispatch(unauthenticateUser())

            localStorage.setItem('authData', JSON.stringify({ isAuth: false, role: null }));
        } catch (error) {
            console.log(error);
            // setError(error.response.data.errors[0].msg)
        }
    }
    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <NavLink to='/' className="m-2">
                        Home
                    </NavLink>
                </div>

                {isAuth ? (
                    <div className="flex  flex-row items-center">
                        currentUser = {role}
                        <Button onClick={logoutUser} className="m-2"> Logout</Button>
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
