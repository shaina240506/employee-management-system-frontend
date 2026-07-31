import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "../pages/Auth/AuthPage";
import Register from "../pages/Auth/Register";

import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

import GetAllEmployees from "../pages/Admin/GetAllEmployees";
import ViewEmployee from "../pages/Admin/ViewEmployee";
import SearchEmployee from "../pages/Admin/SearchEmployee";
import AdminUpdateEmployee from "../pages/Admin/AdminUpdateEmployee";

import AssetManagement from "../pages/Admin/AssetManagement";
import AssignAsset from "../pages/Admin/AssignAsset";
import UpdateAsset from "../pages/Admin/UpdateAsset";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Navigate to="/employee/login" replace />} />
        <Route path="/employee/login" element={<AuthPage />} />
        <Route path="/employee/register" element={<Register />} />

        {/* Employee */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/update-profile" element={<UpdateProfile />} />
        <Route path="/employee/change-password" element={<ChangePassword />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Get All Employees */}
        <Route path="/admin/employees" element={<GetAllEmployees />} />

        {/* Search Employee */}
        <Route path="/admin/search" element={<SearchEmployee />} />

        {/* View Employee */}
        <Route path="/admin/view/:id" element={<ViewEmployee />} />

        {/* Update Employee */}
        <Route
          path="/admin/update/:id"
          element={<AdminUpdateEmployee />}
        />

        {/* Asset Management */}
        <Route path="/admin/assets" element={<AssetManagement />} />
        <Route path="/admin/assign-asset/:id" element={<AssignAsset />} />
        <Route path="/admin/update-asset/:id" element={<UpdateAsset />} />

        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/employee/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;