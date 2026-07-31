import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getEmployeeById } from "../../services/EmployeeService";

import BackButton from "../../components/common/BackButton";

function ViewEmployee() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    setLoading(true);

    try {
      const response = await getEmployeeById(id);

      setEmployee(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Employee Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }


    return (
    <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

            <div className="flex items-center mb-8">

                <BackButton />

            </div>

            <h1 className="text-3xl font-bold text-purple-700 mb-8">
                Employee Details
            </h1>

            {employee && (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* YAHAN SE TERA SARA DATA START HOGA */}

                    <div>
                        <p><b>ID:</b> {employee.id}</p>
                    </div>

                    <div>
                        <p><b>Role:</b> {employee.role}</p>
                    </div>

                    <div>
                        <p><b>First Name:</b> {employee.firstName}</p>
                    </div>

                    <div>
                        <p><b>Last Name:</b> {employee.lastName}</p>
                    </div>

                    <div>
                        <p><b>Email:</b> {employee.email}</p>
                    </div>

                    <div>
                        <p><b>Phone:</b> {employee.phoneNumber}</p>
                    </div>

                    <div>
                        <p><b>Date of Birth:</b> {employee.dateOfBirth}</p>
                    </div>

                    <div>
                        <p><b>Gender:</b> {employee.gender}</p>
                    </div>

                    <div>
                        <p><b>Department:</b> {employee.department}</p>
                    </div>

                    <div>
                        <p><b>Designation:</b> {employee.designation}</p>
                    </div>

                    <div className="md:col-span-2">
                        <p><b>Address:</b> {employee.address}</p>
                    </div>

                    <div>
                        <p>
                            <b>Created At:</b>{" "}
                            {employee.createdAt
                                ? new Date(employee.createdAt).toLocaleString("en-IN", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                      hour12: true,
                                  })
                                : "N/A"}
                        </p>
                    </div>

                    <div>
                        <p>
                            <b>Updated At:</b>{" "}
                            {employee.updatedAt
                                ? new Date(employee.updatedAt).toLocaleString("en-IN", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                      hour12: true,
                                  })
                                : "N/A"}
                        </p>
                    </div>

                </div>

            )}

        </div>

    </div>
);
}

export default ViewEmployee;
