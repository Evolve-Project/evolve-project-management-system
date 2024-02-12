import { useState } from 'react'
import { onLogin, requestResetPassword, requestUserByToken } from '../api/authApi'
import Layout from '../components/layout/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authslice'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router';

const ResetPassword = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const { id } = useParams();

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            Swal.fire({
                title: 'Success',
                text: 'Password reset successful you can now login',
                icon: 'success',
                confirmButtonText: 'okay'
            }).then(() => { console.log("clicked ok") });
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        < div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden" >
            <div className="w-full m-auto bg-white lg:max-w-lg">
                <form onSubmit={(e) => onSubmit(e)} className='flex items-center justify-center h-full'>
                    <Card className='w-[350px]'>
                        <CardHeader>
                            <CardTitle>Reset Password</CardTitle>
                            <CardDescription>Create a new password</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Label htmlFor='password'>
                                Enter your new Password
                            </Label>
                            <Input
                                onChange={(e) => onChange(e)}
                                type='password'
                                value={values.password}
                                className='form-control'
                                id='password'
                                name='password'
                                placeholder='*******'
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
        </ div>
    )
}
export default ResetPassword