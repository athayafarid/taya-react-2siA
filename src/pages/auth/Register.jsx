import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (evt) => {
        const { id, value } = evt.target;
        setDataForm({
            ...dataForm,
            [id]: value,
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password tidak sama");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await authService.register({
                email: dataForm.email,
                password: dataForm.password,
                fullName: dataForm.email.split("@")[0],
            });

            setSuccess("Register berhasil. Silakan login.");
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            setError(err.message || "Register gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account
            </h2>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-green-500 text-sm mb-4 text-center">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300"
                >
                    {loading ? "Loading..." : "Register"}
                </button>
            </form>
        </div>
    )
}
