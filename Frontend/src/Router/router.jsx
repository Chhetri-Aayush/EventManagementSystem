import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "../Pages/LogIn/login";
import SignUp from "../Pages/SignUp/signup";
import Root from "./Root/root";
import Home from "../Layout/Home/home";
import CreateEvent from "../Pages/CreateEvent/createevent";
import PrivateRoute from "./PrivateRoute";
import MusicEvents from "../Pages/Music/music";
import TechEvents from "../Pages/Tech/tech";
import ArtsEvents from "../Pages/Arts/art";
import CulturalEvents from "../Pages/Cultural/cultural";
import EventDetails from "../Pages/EventDetails/eventdetails";
import MyEvents from "../Pages/MyEvent/myevent";
import EditEvent from "../Pages/EditEvent/editevent";
import ParticipateForm from "../Pages/ParticipateForm/participateform";
import ParticipatingEvents from "../Pages/ParticipatingEvents/participatingevents";
import SponsorForm from "../Pages/SponsorForm/sponsorform";
import SponsoredEvents from "../Pages/SponsoredEvent/sponsoredevent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/createEvent",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/music",
        element: (
          <PrivateRoute>
            <MusicEvents />
          </PrivateRoute>
        ),
      },

      {
        path: "/tech",
        element: (
          <PrivateRoute>
            <TechEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/arts",
        element: (
          <PrivateRoute>
            <ArtsEvents />
          </PrivateRoute>
        ),
      },

      {
        path: "/cultural",
        element: (
          <PrivateRoute>
            <CulturalEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/events/:eventId",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/myevent",
        element: (
          <PrivateRoute>
            <MyEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/editevent/:eventId",
        element: (
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/participate/:eventId",
        element: (
          <PrivateRoute>
            <ParticipateForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/participatingEvent",
        element: (
          <PrivateRoute>
            <ParticipatingEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/sponsor/:eventId",
        element: (
          <PrivateRoute>
            <SponsorForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/sponsoredEvent",
        element: (
          <PrivateRoute>
            <SponsoredEvents />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
