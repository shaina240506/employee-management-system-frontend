import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BackButton from "../../components/common/BackButton";

import {
    getAssetById,
    updateAsset
} from "../../services/AssetService";

function UpdateAsset() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        employeeId: "",

        assetType: "",

        assetName: "",

        allocatedDate: "",

        status: ""

    });

    useEffect(() => {

        fetchAsset();

    }, []);

    const fetchAsset = async () => {

        try {

            const response = await getAssetById(id);

            setFormData({

                employeeId: response.data.employeeId,

                assetType: response.data.assetType,

                assetName: response.data.assetName,

                allocatedDate: response.data.allocatedDate,

                status: response.data.status

            });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to Fetch Asset"

            );

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async () => {

        if (

            !formData.assetType ||

            !formData.assetName ||

            !formData.allocatedDate ||

            !formData.status

        ) {

            toast.error("All Fields are Required");

            return;

        }

        setLoading(true);

        try {

            await updateAsset(id, formData);

            toast.success("Asset Updated Successfully");

            navigate("/admin/assets");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to Update Asset"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">

            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">

                <div className="flex justify-between items-center mb-8">

                   <BackButton path="/admin/assets" />

                </div>

                <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">

                    Update Asset

                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block font-semibold mb-2">

                            Asset Type

                        </label>

                        <select

                            name="assetType"

                            value={formData.assetType}

                            onChange={handleChange}

                            className="w-full border rounded-xl px-4 py-3"

                        >

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

                    <div>

                        <label className="block font-semibold mb-2">

                            Asset Name

                        </label>

                        <input

                            type="text"

                            name="assetName"

                            value={formData.assetName}

                            onChange={handleChange}

                            className="w-full border rounded-xl px-4 py-3"

                        />

                    </div>
                                        <div>

                        <label className="block font-semibold mb-2">

                            Allocated Date

                        </label>

                        <input

                            type="date"

                            name="allocatedDate"

                            value={formData.allocatedDate}

                            onChange={handleChange}

                            className="w-full border rounded-xl px-4 py-3"

                        />

                    </div>

                    <div>

                        <label className="block font-semibold mb-2">

                            Status

                        </label>

                        <select

                            name="status"

                            value={formData.status}

                            onChange={handleChange}

                            className="w-full border rounded-xl px-4 py-3"

                        >

                            <option value="Allocated">

                                Allocated

                            </option>

                            <option value="In Use">

                                In Use

                            </option>

                            <option value="Returned">

                                Returned

                            </option>

                            <option value="Damaged">

                                Damaged

                            </option>

                        </select>

                    </div>

                </div>

                <div className="flex justify-center mt-10">

                    <button

                        onClick={handleSubmit}

                        disabled={loading}

                        className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-xl text-lg font-semibold transition"

                    >

                        {

                            loading

                                ?

                                "Updating..."

                                :

                                "Update Asset"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default UpdateAsset;