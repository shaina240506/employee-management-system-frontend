import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployeeAssets } from "../../services/AssetService";
import BackButton from "../../components/common/BackButton";

import { getEmployeeById } from "../../services/EmployeeService";

import { assignAsset } from "../../services/AssetService";

function AssignAsset() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [employee, setEmployee] = useState({});

  const [formData, setFormData] = useState({
    employeeId: "",

    assetType: "",

    assetName: "",

    allocatedDate: "",

    status: "Assigned",
  });

  useEffect(() => {
    fetchEmployee();
    fetchAssets();
  }, []);
  const fetchAssets = async () => {
    try {
      const response = await getEmployeeAssets(id);

      setAssets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeById(id);

      setEmployee(response.data);

      setFormData((prev) => ({
        ...prev,

        employeeId: response.data.id,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Fetch Employee");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.assetType ||
      !formData.assetName ||
      !formData.allocatedDate ||
      !formData.status
    ) {
      toast.error("All fields are required.");

      return;
    }

    setLoading(true);

    try {
      await assignAsset(formData);

      toast.success("Asset Assigned Successfully");

      setFormData({
        employeeId: employee.id,

        assetType: "",

        assetName: "",

        allocatedDate: "",

        status: "Assigned",
      });

      fetchAssets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Assign Asset");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        {/* Top Bar */}

        <div className="flex justify-between items-center mb-8">
          <BackButton />
        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
          Assign Asset
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee ID */}

          <div>
            <label className="block font-semibold mb-2">Employee ID</label>

            <input
              type="text"
              value={employee.id || ""}
              readOnly
              className="w-full border rounded-xl px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Employee Name */}

          <div>
            <label className="block font-semibold mb-2">Employee Name</label>

            <input
              type="text"
              value={`${employee.firstName || ""} ${employee.lastName || ""}`}
              readOnly
              className="w-full border rounded-xl px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Asset Type */}

          <div>
            <label className="block font-semibold mb-2">Asset Type</label>

            <select
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Asset Type</option>

              <option value="Laptop">Laptop</option>

              <option value="Desktop">Desktop</option>

              <option value="Monitor">Monitor</option>

              <option value="Mouse">Mouse</option>

              <option value="Keyboard">Keyboard</option>

              <option value="Headphone">Headphone</option>

              <option value="Mobile">Mobile</option>

              <option value="Charger">Charger</option>

              <option value="ID Card">ID Card</option>
            </select>
          </div>

          {/* Asset Name */}

          <div>
            <label className="block font-semibold mb-2">Asset Name</label>

            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              placeholder="Enter Asset Name"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Allocated Date */}

          <div>
            <label className="block font-semibold mb-2">Allocated Date</label>

            <input
              type="date"
              name="allocatedDate"
              value={formData.allocatedDate}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Status */}

          <div>
            <label className="block font-semibold mb-2">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="Assigned">Assigned</option>

              <option value="Returned">Returned</option>

              <option value="Lost">Lost</option>

              <option value="Damaged">Damaged</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-10">
  <button
    onClick={handleSubmit}
    disabled={loading}
    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-10 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
  >
    {loading ? "Assigning..." : "Assign Asset"}
  </button>
</div>

<div className="mt-12">
  <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
    Previously Assigned Assets
  </h2>

  {assets.length === 0 ? (
    <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">
      No Assets Assigned Yet
    </div>
  ) : (
    <div className="space-y-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="border rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
        >
          <div>
            <h3 className="font-bold text-lg">{asset.assetName}</h3>

            <p className="text-gray-600">{asset.assetType}</p>

            <p className="text-sm text-gray-500">
              Allocated:{" "}
              {new Date(asset.allocatedDate).toLocaleDateString("en-IN")}
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            {asset.status}
          </span>
        </div>
      ))}
    </div>
  )}
</div>
</div>
    </div>
  );
}

export default AssignAsset;
