import SignIn from "../Pages/Auth/SignIn/SignIn";
import SignUp from "../Pages/Auth/SignUp/SignUp";

const routes = [
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
