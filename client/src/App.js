import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import MainLayout from './Layout/MainLayout';


//Routes
import mainRoutes from "./Routes/applicationRoutes";
import mainSubRoutes from "./Routes/applicationSubRoutes";
import authRoutes from "./Routes/authRoutes";
import { useDispatch, useSelector } from 'react-redux';
import LandingLayout from './Layout/LandingLayout';
import setAuthToken from './Hooks/api/setAuthToken';
import { useEffect } from 'react';
import { loadUser } from './Store/auth/authSlice';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const renderRoutes = (routes) => {
    return routes.map((route) => {
      return <Route exact path={route.route} key={route.key} element={route.component} />
    })
  }

  if (isAuthenticated) {
    return (
      <MainLayout>
        <Routes>
          {renderRoutes(mainRoutes)}
          {renderRoutes(mainSubRoutes)}
          <Route path="*" element={<Navigate to={"/dashboard"} />} />
        </Routes>
      </MainLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <LandingLayout>
        <Routes>
          {renderRoutes(authRoutes)}
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </LandingLayout>
    );
  }
}

export default App;
