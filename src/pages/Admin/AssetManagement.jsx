import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BackButton from "../../components/common/BackButton";

import {
  getEmployeeAssetSummary,
  getEmployeeAssets,
  deleteMultipleAssets,
} from "../../services/AssetService";

function AssetManagement() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [employeeAssets, setEmployeeAssets] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [selectedAssets, setSelectedAssets] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employee) => {
      const keyword = search.toLowerCase();

      return (
        employee.employeeName.toLowerCase().includes(keyword) ||
        employee.department.toLowerCase().includes(keyword) ||
        employee.designation.toLowerCase().includes(keyword)
      );
    });

    setFilteredEmployees(filtered);
  }, [search, employees]);

  const fetchEmployees = async () => {
    setLoading(true);

    try {
      const response = await getEmployeeAssetSummary();

      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Fetch Employees");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (employee) => {
    try {
      const response = await getEmployeeAssets(employee.employeeId);

      setEmployeeAssets(response.data);

      setSelectedEmployee(employee);

      setShowViewModal(true);
    } catch (error) {
      toast.error("Unable to Fetch Assets");
    }
  };

  const handleDeleteClick = async (employee) => {
    try {
      const response = await getEmployeeAssets(employee.employeeId);

      setEmployeeAssets(response.data);

      setSelectedEmployee(employee);

      setSelectedAssets([]);

      setShowDeleteModal(true);
    } catch (error) {
      toast.error("Unable to Fetch Assets");
    }
  };
  const handleUpdateClick = async (employee) => {
    try {
      const response = await getEmployeeAssets(employee.employeeId);

      setEmployeeAssets(response.data);

      setSelectedEmployee(employee);

      setShowUpdateModal(true);
    } catch (error) {
      toast.error("Unable to Fetch Assets");
    }
  };

  const handleCheckbox = (assetId) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter((id) => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };

  const confirmDelete = async () => {
    if (selectedAssets.length === 0) {
      toast.error("Please Select Asset");
      return;
    }

    try {
      await deleteMultipleAssets(selectedAssets);

      toast.success("Assets Deleted Successfully");

      setShowDeleteModal(false);

      setSelectedEmployee(null);

      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Delete Assets");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Top Bar */}

        <div className="flex items-center justify-between mb-8">
          <BackButton path="/admin/dashboard" />

          <h1 className="text-4xl font-bold text-purple-700">
            Asset Management
          </h1>

          <div></div>
        </div>

        {/* Search */}

        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

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

                    <th className="p-4 border border-white">Employee</th>

                    <th className="p-4 border border-white">Department</th>

                    <th className="p-4 border border-white">Designation</th>

                    <th className="p-4 border border-white">Assets</th>

                    <th className="p-4 border border-white">Status</th>

                    <th className="p-4 border border-white">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => (
                      <tr
                        key={employee.employeeId}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-purple-50 transition`}
                      >
                        <td className="border p-4 text-center">
                          {employee.employeeId}
                        </td>

                        <td className="border p-4 font-medium">
                          {employee.employeeName}
                        </td>

                        <td className="border p-4">{employee.department}</td>

                        <td className="border p-4">{employee.designation}</td>

                        <td className="border p-4 text-center font-bold text-purple-700">
                          {employee.totalAssets}
                        </td>

                        <td className="border p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              employee.status === "Assigned"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {employee.status === "Assigned"
                              ? "Assigned"
                              : "Not Assigned"}
                          </span>
                        </td>

                        <td className="border p-4">
                          <div className="flex justify-center gap-3">
                            {/* View */}

                            <button
                              onClick={() => handleView(employee)}
                              className="w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                              title="View Assets"
                            >
                              👁
                            </button>

                            {/* Update */}

                            <button
                              onClick={() => handleUpdateClick(employee)}
                              className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                              title="Update Assets"
                            >
                              ✏️
                            </button>

                            {/* Assign */}

                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/assign-asset/${employee.employeeId}`,
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                              title="Assign Asset"
                            >
                              ➕
                            </button>

                            {/* Delete */}

                            <button
                              onClick={() => handleDeleteClick(employee)}
                              className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                              title="Delete Assets"
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
                        colSpan="7"
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
        {/* View Modal */}

        {showViewModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[600px] p-8">
              <h2 className="text-3xl font-bold text-purple-700 mb-6">
                {selectedEmployee?.employeeName}'s Assets
              </h2>

              {employeeAssets.length > 0 ? (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {employeeAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="border rounded-xl p-5 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">
                          {asset.assetName}
                        </h3>

                        <p className="text-gray-600">{asset.assetType}</p>

                        <p className="text-sm text-gray-500">
                          Allocated : {asset.allocatedDate}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          asset.status === "Allocated" ||
                          asset.status === "In Use"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No Assets Assigned
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Update Modal */}

        {showUpdateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[650px] p-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                Update Assets
              </h2>

              <p className="mb-6 text-gray-600 font-medium">
                {selectedEmployee?.employeeName}
              </p>

              <div className="space-y-4 max-h-[350px] overflow-y-auto">
                {employeeAssets.length > 0 ? (
                  employeeAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="border rounded-xl p-5 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">
                          {asset.assetName}
                        </h3>

                        <p className="text-gray-500">{asset.assetType}</p>

                        <p className="text-sm text-gray-400">
                          Allocated : {asset.allocatedDate}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          navigate(`/admin/update-asset/${asset.id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                      >
                        ✏ Update
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No Assets Assigned
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Delete Modal */}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[500px] p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-6">
                Delete Assets
              </h2>

              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {employeeAssets.map((asset) => (
                  <label
                    key={asset.id}
                    className="flex items-center gap-4 border rounded-lg p-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAssets.includes(asset.id)}
                      onChange={() => handleCheckbox(asset.id)}
                    />

                    <div>
                      <div className="font-semibold">{asset.assetName}</div>

                      <div className="text-sm text-gray-500">
                        {asset.assetType}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedEmployee(null);
                  }}
                  className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssetManagement;
