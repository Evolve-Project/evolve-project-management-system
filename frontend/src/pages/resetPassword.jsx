import { useState } from 'react'
import { onLogin, requestResetPassword, requestUserByToken, resetPassword } from '../api/authApi'
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
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordSame, setPasswordSame] = useState(true);

    const [error, setError] = useState(false)

    const onChangePassword = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const { id } = useParams();

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()
        if (values.password != confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Password and Confirm Password are not same',
                icon: 'Error',
                confirmButtonText: 'Okay'
            }).then(() => { console.log("clicked ok") });
        } else {
            try {
                const res = await resetPassword({ id, values });
                console.log(res);
                Swal.fire({
                    title: 'Success',
                    text: 'Password reset successful you can now login',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then(() => { console.log("clicked ok") });
            } catch (error) {
                console.log("Error: ", error);
                Swal.fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                }).then(() => { console.log("clicked ok") });
            }
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
                                onChange={(e) => onChangePassword(e)}
                                type='password'
                                value={values.password}
                                className='form-control'
                                id='password'
                                name='password'
                                placeholder='*******'
                                required
                            />
                        </CardContent>
                        <CardContent>
                            <Label htmlFor='confirmPassword'>
                                Confirm your new Password
                            </Label>
                            <Input
                                onChange={(e) => onChangeConfirmPassword(e)}
                                type='text'
                                value={confirmPassword}
                                className='form-control'
                                id='confirmPassword'
                                name='confirmPassword'
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