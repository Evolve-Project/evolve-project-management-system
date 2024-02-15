import { useState } from 'react'
import { onLogin, requestResetPassword } from '../api/authApi'
import Layout from '../components/layout/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authslice'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'


const ResetForm = () => {
    const [values, setValues] = useState({
        email: '',
    })
    const [error, setError] = useState(false)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await requestResetPassword(values);
            console.log(data);
            Swal.fire({
                title: 'Success',
                text: 'Reset Link sent to your email address',
                icon: 'success',
                confirmButtonText: 'okay'
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto bg-white lg:max-w-lg">
                <form onSubmit={(e) => onSubmit(e)} className='flex items-center justify-center h-full'>
                    <Card className='w-[350px]'>
                        <CardHeader>
                            <CardTitle>Reset Password</CardTitle>
                            <CardDescription>Welcome {"User Name"} to Evolve Advanced Mentoring App</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Label htmlFor='email'>
                                User Email
                            </Label>
                            <Input
                                onChange={(e) => onChange(e)}
                                type='email'
                                value={values.email}
                                className='form-control'
                                id='email'
                                name='email'
                                placeholder='test@example.com'
                                required
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type='submit' className="w-full" >
                                Reset Password
                            </Button>
                        </CardFooter>
                    </Card>

                </form>
            </div>
        </div>
    )
}

export default ResetForm