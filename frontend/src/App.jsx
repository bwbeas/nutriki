import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Food from "./pages/Food";
import Water from "./pages/Water";
import Cycle from "./pages/Cycle";
import Mood from "./pages/Mood";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

<Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/register"
  element={<Register />}
/>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/food" element={<Food />} />
      <Route path="/water" element={<Water />} />
      <Route path="/cycle" element={<Cycle />} />
      <Route path="/mood" element={<Mood />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}