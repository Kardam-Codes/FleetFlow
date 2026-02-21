import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import Drivers from "../pages/Drivers";
import Trips from "../pages/Trips";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/vehicles"
        element={
          <Layout>
            <Vehicles />
          </Layout>
        }
      />

      <Route
        path="/drivers"
        element={
          <Layout>
            <Drivers />
          </Layout>
        }
      />

      <Route
        path="/trips"
        element={
          <Layout>
            <Trips />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;