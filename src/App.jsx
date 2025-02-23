import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing.jsx";
import CreateTrip from "./pages/Create-Trip.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ViewTrip from "./pages/View-Trip.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/create-trip"
        element={
          <>
            <SignedIn>
              <CreateTrip />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/my-trips"
        element={
          <>
            <SignedIn>
              <MyTrips />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/my-trips/:id"
        element={
          <>
            <SignedIn>
              <ViewTrip />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
