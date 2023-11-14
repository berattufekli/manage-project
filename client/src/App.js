import { Route, Routes } from 'react-router-dom';
import './App.css';

import MainLayout from './Layout/MainLayout';


//Routes
import mainRoutes from "./Routes/applicationRoutes";
import mainSubRoutes from "./Routes/applicationSubRoutes";
import authRoutes from "./Routes/authRoutes";

function App() {

  const renderRoutes = (routes) => {
    return routes.map((route) => {
      return <Route exact path={route.route} key={route.key} element={route.component} />
    })
  }

  return (
    <MainLayout>
      <Routes>
        {renderRoutes(mainRoutes)}
        {renderRoutes(mainSubRoutes)}
        {renderRoutes(authRoutes)}
      </Routes>
    </MainLayout>
  );
}

export default App;
