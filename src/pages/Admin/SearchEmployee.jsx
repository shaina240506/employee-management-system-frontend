import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { searchEmployees } from "../../services/EmployeeService";

import BackButton from "../../components/common/BackButton";
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
        gender: ""
    });

    const [employees, setEmployees] = useState([]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSearchData((prev) => ({
            ...prev,
            [name]: value
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
            gender: ""
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
                error.response?.data?.message ||
                "Search Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">

                {/* Top Bar */}

                <div className="flex items-center justify-between mb-8">

                    <BackButton />

                    <button
                        type="button"
                        onClick={handleReset}
                        className="border border-gray-300 bg-white hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold shadow transition"
                    >
                        🔄 Reset
                    </button>

                </div>

                <h1 className="text-4xl font-bold text-center text-purple-700">
                    Search Employee
                </h1>

                <p className="text-center text-gray-500 mt-3 mb-10">
                    Search employees using one or more filters.
                </p>

                <form
                    onSubmit={handleSearch}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                                        <InputField
                        label="Employee ID"
                        name="id"
                        value={searchData.id}
                        onChange={handleChange}
                    />

                    <InputField
                        label="First Name"
                        name="firstName"
                        value={searchData.firstName}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Last Name"
                        name="lastName"
                        value={searchData.lastName}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Email"
                        name="email"
                        value={searchData.email}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Phone Number"
                        name="phoneNumber"
                        value={searchData.phoneNumber}
                        onChange={handleChange}
                    />

                    <SelectField
                        label="Department"
                        name="department"
                        value={searchData.department}
                        onChange={handleChange}
                        options={[
                            "IT",
                            "HR",
                            "Finance",
                            "Marketing",
                            "Sales"
                        ]}
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
                            "Intern"
                        ]}
                    />

                    <SelectField
                        label="Gender"
                        name="gender"
                        value={searchData.gender}
                        onChange={handleChange}
                        options={[
                            "Male",
                            "Female",
                            "Other"
                        ]}
                    />

                    <div className="md:col-span-2 mt-2">

                        <Button
                            text={loading ? "Searching..." : "🔍 Search Employee"}
                            type="submit"
                        />

                    </div>

                </form>

            </div>

            {/* Search Result */}

            {employees.length > 0 && (

                <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8 mt-8">

                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
                        Search Results
                    </h2>

                    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">

                        <table className="w-full">

                            <thead className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">

                                <tr>

                                    <th className="p-4 border border-white">ID</th>
                                    <th className="p-4 border border-white">Name</th>
                                    <th className="p-4 border border-white">Email</th>
                                    <th className="p-4 border border-white">Department</th>
                                    <th className="p-4 border border-white">Designation</th>
                                    <th className="p-4 border border-white">Role</th>
                                    <th className="p-4 border border-white">Actions</th>

                                </tr>

                            </thead>

                            <tbody>
                                                                {employees.map((employee, index) => (

                                    <tr
                                        key={employee.id}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50"
                                        } hover:bg-purple-50 transition`}
                                    >

                                        <td className="border p-4 text-center font-medium">
                                            {employee.id}
                                        </td>

                                        <td className="border p-4">
                                            {employee.firstName} {employee.lastName}
                                        </td>

                                        <td className="border p-4">
                                            {employee.email}
                                        </td>

                                        <td className="border p-4">
                                            {employee.department}
                                        </td>

                                        <td className="border p-4">
                                            {employee.designation}
                                        </td>

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

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>

    );

}

export default SearchEmployee;