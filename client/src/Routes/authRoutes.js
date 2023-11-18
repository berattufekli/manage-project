import SignIn from "../Pages/Auth/SignIn/SignIn";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import Landing from "../Pages/Landing/Landing";

const routes = [
  {
    name: "Landing",
    route: "/",
    key: "/",
    component: <Landing />,
  },
  {
    name: "Sign Up",
    route: "/sign-up",
    key: "Sign Up",
    component: <SignUp />,
  },
  {
    name: "Sign In",
    route: "/sign-in",
    key: "Sign In",
    component: <SignIn />,
  },
];

export default routes;
