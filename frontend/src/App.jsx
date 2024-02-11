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

// const PrivateRoutes = () => {
//   const { isAuth } = useSelector((state) => state.auth)
//   const checkLogin = isAuth.isAuth;

//   return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
// }

// const RestrictedRoutes = () => {
//   const { isAuth } = useSelector((state) => state.auth)

//   return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
// }

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
      

//         <Route element={<PrivateRoutes />}>
//           {console.log("R")}
//           <Route path='/dashboard' element={<Dashboard />} />
//           {console.log("O")}
//         </Route>
//         <Route element={<RestrictedRoutes />}>
//           <Route path='/register' element={<Register />} />
//           <Route path='/login' element={<Login />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


const App = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for public routes */}
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/dashboard" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuth ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* Private route for authenticated users */}
        <Route
          path="/"
          element={
            isAuth ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};



export default App;
