import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAllEmployees,
  deleteEmployee,
} from "../../services/EmployeeService";

import BackButton from "../../components/common/BackButton";

function GetAllEmployees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);

    try {
      const response = await getAllEmployees();

      setEmployees(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Fetch Employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);

      toast.success("Employee Deleted Successfully");

      setShowDeleteModal(false);
      setSelectedEmployee(null);

      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Top Bar */}

        <div className="flex items-center justify-between mb-8">
          <BackButton />

          <button
            onClick={() => navigate("/admin/search")}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            🔍 Search Employee
          </button>
        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
          All Employees
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <h2 className="text-xl font-semibold text-purple-700 animate-pulse">
              Loading Employees...
            </h2>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="max-h-[65vh] overflow-y-auto overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                  <tr>
                    <th className="p-4 border border-white">ID</th>
                    <th className="p-4 border border-white">Name</th>
                    <th className="p-4 border border-white">Email</th>
                    <th className="p-4 border border-white">Phone</th>
                    <th className="p-4 border border-white">Department</th>
                    <th className="p-4 border border-white">Designation</th>
                    <th className="p-4 border border-white">Role</th>
                    <th className="p-4 border border-white">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee, index) => (
                      <tr
                        key={employee.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-purple-50 transition`}
                      >
                        <td className="border p-4 text-center font-medium">
                          {employee.id}
                        </td>

                        <td className="border p-4">
                          {employee.firstName} {employee.lastName}
                        </td>

                        <td className="border p-4">{employee.email}</td>

                        <td className="border p-4">{employee.phoneNumber}</td>

                        <td className="border p-4">{employee.department}</td>

                        <td className="border p-4">{employee.designation}</td>

                        <td className="border p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              employee.role === "ADMIN"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {employee.role}
                          </span>
                        </td>

                        <td className="border p-4">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() =>
                                navigate(`/admin/view/${employee.id}`)
                              }
                              className="w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                              title="View Employee"
                            >
                              👁
                            </button>

                            <button
                              onClick={() =>
                                navigate(`/admin/update/${employee.id}`)
                              }
                              className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                              title="Update Employee"
                            >
                              ✏️
                            </button>
                          
                            <button
                              onClick={() => handleDeleteClick(employee)}
                              className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                              title="Delete Employee"
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-10 text-center text-gray-500 text-lg"
                      >
                        🚫 No Employees Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-8">
            <div className="text-center">
              <div className="text-6xl mb-3">🗑</div>

              <h2 className="text-2xl font-bold text-red-600">
                Delete Employee
              </h2>

              <p className="text-gray-600 mt-5 leading-7">
                Are you sure you want to delete
                <br />
                <span className="font-bold text-black">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </span>
                ?
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedEmployee(null);
                }}
                className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllEmployees;
