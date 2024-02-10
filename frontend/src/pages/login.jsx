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
        <Layout>
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
                <h1>Login</h1>

                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email address
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={values.email}
                        placeholder='test@gmail.com'
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type='password'
                        value={values.password}
                        className='form-control'
                        id='password'
                        name='password'
                        placeholder='passwod'
                        required
                    />
                </div>

                <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </Layout>
    )
}

export default Login