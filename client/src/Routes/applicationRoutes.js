import CalendarDashboard from "../Pages/Application/Calendar/CalendarDashboard";
import Dashboard from "../Pages/Application/Dashboard/Dashboard";
import ProjectDashboard from "../Pages/Application/Project/ProjectDashboard";
import ProjectLanding from "../Pages/Application/Project/ProjectLanding";
import ToDoDashboard from "../Pages/Application/ToDo/ToDoDashboard";


const routes = [
  {
    name: "Dashboard",
    route: "/dashboard",
    key: "Dashboard",
    component: <Dashboard />,
  },
  {
    name: "Projects",
    route: "/projects",
    key: "Projects",
    component: <ProjectLanding />,
  },
  {
    name: "Projects",
    route: "/projects/:id",
    key: "Projects",
    component: <ProjectDashboard />,
  },
  {
    name: "Calendar",
    route: "/calendar",
    key: "Calendar",
    component: <CalendarDashboard />,
  },
  {
    name: "ToDo",
    route: "/to-do",
    key: "ToDo",
    component: <ToDoDashboard />,
  },
  
];

export default routes;
