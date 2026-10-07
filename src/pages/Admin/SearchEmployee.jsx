import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSearch, FiRefreshCw, FiEye, FiEdit2 } from "react-icons/fi";
import { searchEmployees } from "../../services/EmployeeService";
import Layout from "../../components/layout/Layout";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import Button from "../../components/ui/Button";

function SearchEmployee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [searchData, setSearchData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    designation: "",
    gender: "",
  });

  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setSearchData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      department: "",
      designation: "",
      gender: "",
    });
    setEmployees([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await searchEmployees(searchData);
      setEmployees(response.data);
      if (response.data.length === 0) {
        toast.info("No Employee Found");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Search Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Search Employees">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Search Criteria Card */}
        <div className="slds-card">
          <div className="slds-card-header">
            <div>
              <h1 className="slds-card-title">Search Filters</h1>
              <p style={{ fontSize: "12px", color: "var(--slds-text-weak)", margin: "2px 0 0" }}>
                Filter employees using one or multiple attributes
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="slds-btn slds-btn-neutral"
            >
              <FiRefreshCw size={13} /> Reset Filters
            </button>
          </div>
          <div className="slds-card-body">
            <form onSubmit={handleSearch}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <InputField
                  label="Employee ID"
                  name="id"
                  value={searchData.id}
                  onChange={handleChange}
                  placeholder="e.g. 101"
                />
                <InputField
                  label="First Name"
                  name="firstName"
                  value={searchData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. John"
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={searchData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Doe"
                />
                <InputField
                  label="Email"
                  name="email"
                  value={searchData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                />
                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  value={searchData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                />
                <SelectField
                  label="Department"
                  name="department"
                  value={searchData.department}
                  onChange={handleChange}
                  options={["IT", "HR", "Finance", "Marketing", "Sales"]}
                />
                <SelectField
                  label="Designation"
                  name="designation"
                  value={searchData.designation}
                  onChange={handleChange}
                  options={[
                    "Software Engineer",
                    "Senior Software Engineer",
                    "HR Executive",
                    "Manager",
                    "Intern",
                  ]}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  value={searchData.gender}
                  onChange={handleChange}
                  options={["Male", "Female", "Other"]}
                />
              </div>

              <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "clamp(160px, 200px, 100%)" }}>
                  <Button
                    text={loading ? "Searching..." : "Search Directory"}
                    type="submit"
                    disabled={loading}
                    icon={<FiSearch size={14} />}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Results Card */}
        {employees.length > 0 && (
          <div className="slds-card">
            <div className="slds-card-header">
              <h2 className="slds-card-title">
                Search Results ({employees.length})
              </h2>
            </div>
            <div className="slds-card-body" style={{ padding: 0 }}>
              <div className="slds-table-wrap" style={{ border: "none" }}>
                <table className="slds-table">
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }} className="text-center">ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th className="text-center">Role</th>
                      <th className="text-center" style={{ width: "100px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.id}>
                        <td className="text-center" style={{ fontWeight: "700", color: "var(--slds-text-weak)" }}>
                          {emp.id}
                        </td>
                        <td style={{ fontWeight: "600", color: "var(--slds-text-default)" }}>
                          {emp.firstName} {emp.lastName}
                        </td>
                        <td style={{ color: "var(--slds-text-weak)" }}>{emp.email}</td>
                        <td>
                          {emp.department ? (
                            <span className="slds-badge slds-badge-neutral">{emp.department}</span>
                          ) : (
                            <span style={{ color: "var(--slds-text-weak)" }}>—</span>
                          )}
                        </td>
                        <td style={{ fontSize: "12px" }}>{emp.designation || "—"}</td>
                        <td className="text-center">
                          <span className={`slds-badge ${emp.role === "ADMIN" ? "slds-badge-error" : "slds-badge-success"}`}>
                            {emp.role}
                          </span>
                        </td>
                        <td className="text-center">
                          <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
                            <button
                              onClick={() => navigate(`/admin/view/${emp.id}`)}
                              className="slds-btn-icon slds-btn-icon-primary"
                              title="View Details"
                            >
                              <FiEye size={15} />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/update/${emp.id}`)}
                              className="slds-btn-icon slds-btn-icon-warning"
                              title="Edit Record"
                            >
                              <FiEdit2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SearchEmployee;