import { createBrowserRouter } from "react-router-dom";

import AuthGuard from "./AuthGuard";
import Dashboard from "../layout/Dashboard";

import LandingPage from "../pages/Landing/LandingPage";
import TripsPage from "../pages/Trips/TripsPage";
import ExplorePage from "../pages/Explore/Explore";
import TripDetailPage from "../pages/TripDetail/TripDetail";
import ProfilePage from "../pages/UserProfile/Profile";
import NotFound from "../pages/NotFound";
import AddTrip from "../pages/AddTrip/AddTrip";
import Map from "../pages/Map/Map";
import EditTrip from "../pages/EditTrip/EditTrip";
import PublicTripDetailPage from "../pages/PublicTripDetail/PublicTripDetail";
import PublicUserProfilePage from "../pages/PublicUserProfile/PublisUserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <AuthGuard><Dashboard /></AuthGuard>,
    children: [
        {
            index: true,
            path: "my-trips",
            element: <TripsPage />
        },
        {
            path: "my-trips/:id",
            element: <TripDetailPage />,
        },
        {
          path: "my-trips/add",
          element: <AddTrip />
        },
        {
          path: "my-trips/edit/:id",
          element: <EditTrip />
        },
        {
          path: "explore",
          element: <ExplorePage />,
        },
        {
          path: "explore/:id",
          element: <PublicTripDetailPage />
        },
        {
          path: "explore/user-profile/:userID",
          element: <PublicUserProfilePage />
        },
        {
          path: "map",
          element: <Map />
        },
        {
          path: "profile",
          element: <ProfilePage />
        },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

