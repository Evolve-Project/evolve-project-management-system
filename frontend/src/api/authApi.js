import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
    return await axios.post(
        'http://localhost:8000/api/register',
        registrationData
    )
}

export async function onLogin(loginData) {
    return await axios.post('http://localhost:8000/api/login', loginData)
}

export async function onLogout() {
    return await axios.get('http://localhost:8000/api/logout')
}

export async function fetchProtectedInfo() {
    return await axios.get('http://localhost:8000/api/protected')
}

export async function requestResetPassword(userEmail) {
    return await axios.post('http://localhost:8000/api/reset-password', userEmail);
}

export async function requestUserByToken(userToken) {
    return await axios.post('http://localhost:8000/api/get-user-by-token', { token: userToken });
}