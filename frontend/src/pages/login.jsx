import { useState } from "react";
import { onLogin } from "../api/authApi";
import { useDispatch } from "react-redux";
import { authenticateUser } from "./../redux/slices/authslice";
import { Link, Navigate } from "react-router-dom";
import Swal from 'sweetalert2'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onLogin(values);
      const role = data.role;
      dispatch(authenticateUser({ role }));
      localStorage.setItem('authData', JSON.stringify({ isAuth: true, role: role }));
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Wrong Username or password',
        icon: 'error',
        confirmButtonText: 'Retry'
      })
    }
  }
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-jman">
      <div className="absolute top-0 left-0 w-full h-auto p-6">
        <img src="https://jmangroup.com/wp-content/themes/jman_v1-35/src/media/logo.svg" alt="logo" />
      </div>
      <div className="w-full m-auto lg:max-w-lg">
        <form onSubmit={(e) => onSubmit(e)} className='flex items-center justify-center h-full'>
          <Card className='w-[350px]'>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Welcome to Evolve Advanced Mentoring App</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor='email'>
                Email address
              </Label>
              <Input
                onChange={(e) => onChange(e)}
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={values.email}
                placeholder='test@gmail.com'
                required
              />
            </CardContent>
            <CardContent>
              <Label htmlFor='password'>
                Password
              </Label>
              <div className='relative'>
                <Input
                  onChange={(e) => onChange(e)}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  className='form-control'
                  id='password'
                  name='password'
                  placeholder='password'
                  required
                />
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} absolute right-5 top-1.5`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className='text-xs mb-1'>Forgot  Password?<Link className='text-primary' to={"/reset"}> Click here </Link>to Reset</p>
              <Button type='submit' className="w-full bg-jman" >
                Login
              </Button>
            </CardFooter>
          </Card>

        </form>
      </div>
    </div>
  )
}

export default Login;
