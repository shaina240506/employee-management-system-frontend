import { useState } from "react";
import { toast } from "react-toastify";

import { deleteEmployee } from "../../services/EmployeeService";

import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

function DeleteEmployee() {

    const [id, setId] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Delete button press
    const handleDelete = (e) => {

        e.preventDefault();

        if (!id) {

            toast.error("Please Enter Employee ID");

            return;

        }

        setShowDeleteModal(true);

    };

    // Confirm Delete
    const confirmDelete = async () => {

        try {

            const response = await deleteEmployee(id);

            toast.success(response.data);

            setId("");

            setShowDeleteModal(false);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Delete Failed"

            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <BackButton />

            <div className="bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-red-600 mb-8">

                    Delete Employee

                </h1>

                <form
                    onSubmit={handleDelete}
                    className="space-y-5"
                >

                    <InputField

                        label="Employee ID"

                        name="id"

                        value={id}

                        onChange={(e) => setId(e.target.value)}

                        placeholder="Enter Employee ID"

                    />

                    <Button

                        text="Delete"

                        type="submit"

                    />

                </form>

            </div>

            {showDeleteModal && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[420px]">

                        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">

                            Delete Employee

                        </h2>

                        <p className="text-center text-gray-600 mb-8">

                            Are you sure you want to delete this employee?

                        </p>

                        <div className="flex justify-center gap-4">

                            <button

                                type="button"

                                onClick={() => setShowDeleteModal(false)}

                                className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"

                            >

                                Cancel

                            </button>

                            <button

                                type="button"

                                onClick={confirmDelete}

                                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"

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

export default DeleteEmployee;