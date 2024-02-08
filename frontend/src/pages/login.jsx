import { useState } from 'react'
import { onLogin } from '../api/authApi'
import Layout from '../components/layout/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from './../redux/slices/authslice'
import { Navigate } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState(false)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await onLogin(values);
            const role = data.role;
            dispatch(authenticateUser({ role }));
            localStorage.setItem('authData', JSON.stringify({ isAuth: true, role: role }));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto bg-white lg:max-w-lg">
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
                            <Input
                                onChange={(e) => onChange(e)}
                                type='password'
                                value={values.password}
                                className='form-control'
                                id='password'
                                name='password'
                                placeholder='passwod'
                                required
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type='submit' className="w-full" >
                                Login
                            </Button>
                        </CardFooter>
                    </Card>

                </form>
            </div>
        </div>
    )
}

export default Login