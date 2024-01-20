import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./errorBoundary";

// Shared
const Navbar = lazy(() => import("../src/components/shared/navbar"));
// Guest
const Login = lazy(() => import("../src/components/guest/login"));
const SignUp = lazy(() => import("../src/components/guest/signUp"));
const AboutUs = lazy(() => import("../src/components/guest/about"));
const Leaderboard = lazy(() => import("../src/components/guest/leaderboard"));
const LandingPage = lazy(() => import("../src/components/guest/landing"));
// App
const CodingChallenge = lazy(
  () => import("../src/components/app/coding-challange")
);
const ScoreCard = lazy(() => import("../src/components/app/score-card"));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/aboutus" Component={AboutUs} />
            <Route path="/leaderboard" Component={Leaderboard} />
            <Route path="/codingchallenge" Component={CodingChallenge} />
            <Route path="/score-card" Component={ScoreCard} />
            <Route path="/" Component={LandingPage} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRoutes;
