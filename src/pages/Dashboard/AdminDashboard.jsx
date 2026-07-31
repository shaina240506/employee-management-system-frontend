
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLaptop } from "react-icons/fa";
import { countEmployees } from "../../services/EmployeeService";
import AIChatBot from "../../components/AIChatBot";
function AdminDashboard() {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("employee"));

  const [count, setCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuRef = useRef(null);

  const fetchCount = async () => {
    try {
      const response = await countEmployees();
      setCount(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to Fetch Employee Count",
      );
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setShowMenu(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("employee");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Welcome Banner */}

      <div className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 rounded-3xl shadow-xl p-8 flex justify-between items-center text-white">
        {/* Left Side */}

        <div>
          <h1 className="text-4xl font-bold">Welcome Admin 👋</h1>

          <p className="mt-2 text-lg opacity-90">
            {admin.firstName} {admin.lastName}
          </p>
        </div>

        {/* Avatar */}

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-14 h-14 rounded-full bg-white text-purple-700 text-2xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            {admin.firstName.charAt(0).toUpperCase()}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
              {/* Profile Header */}

              <div className="bg-gradient-to-r from-purple-700 to-fuchsia-600 px-5 py-4 text-white">
                <h3 className="font-semibold text-lg">
                  {admin.firstName} {admin.lastName}
                </h3>

                <p className="text-sm opacity-90">Administrator</p>
              </div>

              {/* Update Profile */}

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/employee/update-profile");
                }}
                className="w-full flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
              >
                <span className="text-xl">👤</span>

                <span className="font-medium">Update Profile</span>
              </button>

              {/* Change Password */}

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/employee/change-password");
                }}
                className="w-full flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
              >
                <span className="text-xl">🔒</span>

                <span className="font-medium">Change Password</span>
              </button>

              <div className="border-t border-gray-200"></div>

              {/* Logout */}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition"
              >
                <span className="text-xl">🚪</span>

                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

  {/* All Employees */}
  <button
    onClick={() => navigate("/admin/employees")}
    className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 flex items-center px-10 py-10"
  >
    <div className="text-6xl">👥</div>

    <div className="ml-8 text-left">
      <h2 className="text-3xl font-bold">All Employees</h2>
      <p className="text-blue-100 mt-2">
        View, Update & Delete Employees
      </p>
    </div>
  </button>

  {/* Asset Management */}
  <button
    onClick={() => navigate("/admin/assets")}
    className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 flex items-center px-10 py-10"
  >
    <FaLaptop className="text-6xl" />

    <div className="ml-8 text-left">
      <h2 className="text-3xl font-bold">Asset Management</h2>

      <p className="text-purple-100 mt-2">
        View, Update & Delete Assets
      </p>
    </div>
  </button>

</div>
      {/* Logout Confirmation Modal */}

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-[430px] p-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
                🚪
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800">
              Logout
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
          <AIChatBot />
        </div>
      )}
      <AIChatBot role="ADMIN" />
    </div>
    
  );
}

export default AdminDashboard;