import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LeafletMap from "./components/LeafletMap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { Dashboard, MajorMedia } from "./pages/customer";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<LeafletMap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer/dashboard" element={<Dashboard />} />
            <Route path="/customer/major-media" element={<MajorMedia />} />
          </Routes>
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
