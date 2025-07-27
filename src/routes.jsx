
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Directors from "./pages/Directors.jsx";
import Actors from "./pages/Actors.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { createBrowserRouter } from "react-router-dom";

export const routeObjects = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/directors",
    element: <Directors />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/actors",
    element: <Actors />,
    errorElement: <ErrorPage />,
  },
];

const routes = createBrowserRouter(routeObjects);

export default routes;

