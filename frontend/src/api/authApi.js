import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/register`,
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`, loginData);
}

export async function onLogout() {
  return await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/logout`);
}

export async function fetchProtectedInfo() {
  return await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/protected`)
}

export async function requestResetPassword(userEmail) {
  return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/request-reset-password`, userEmail);
}

export async function requestUserByToken(userToken) {
  return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/get-user-by-token`, { token: userToken });
}

export async function resetPassword({ id, values }) {
  return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/reset-password`, { token: id, password: values.password });
}
