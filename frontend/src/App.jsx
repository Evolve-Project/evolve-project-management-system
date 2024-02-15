import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { useSelector } from 'react-redux'
import AddQuery from './pages/Mentee/AddQuery'
import Attendance from './pages/Mentee/Attendance'
import Projects from './pages/Mentee/Projects'
import Feedback from './pages/feedback'


const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)
  const checkLogin = isAuth.isAuth;

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/add_query' element={<AddQuery/>} />
        <Route path='/attendance' element={<Attendance/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/feedback' element={<Feedback/>} />

        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/feedback' element={<Feedback/>} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App