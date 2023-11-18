import { Route, Routes } from 'react-router-dom';
import './App.css';

import MainLayout from './Layout/MainLayout';


//Routes
import mainRoutes from "./Routes/applicationRoutes";
import mainSubRoutes from "./Routes/applicationSubRoutes";
import authRoutes from "./Routes/authRoutes";
import { useSelector } from 'react-redux';
import LandingLayout from './Layout/LandingLayout';

function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);

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
          {renderRoutes(authRoutes)}
        </Routes>
      </MainLayout>
    )
  }

  return (
    <LandingLayout>
      <Routes>
        {renderRoutes(authRoutes)}
      </Routes>
    </LandingLayout>
  );
}

export default App;
