import { MdOutlineDownloading } from "react-icons/md";
import { BiMessageAltError } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {
    /* navigate, state & handleChange*/
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    /* process form */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                "https://dummyjson.com/user/login",
                {
                    username: dataForm.email,
                    password: dataForm.password,
                }
            );

            // Jika status bukan 200, tampilkan pesan error
            if (response.status !== 200) {
                setError("Login gagal");
                return;
            }

            // Redirect ke dashboard jika login sukses
            navigate("/");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Login gagal");
            } else {
                setError("Terjadi kesalahan");
            }
        } finally {
            setLoading(false);
        }
    };

    /* error & loading status */
    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BiMessageAltError className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null

    const loadingInfo = loading ? (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
            <MdOutlineDownloading className="me-2 animate-spin" />
            Mohon Tunggu...
        </div>
    ) : null

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Welcome Back 👋
            </h2>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </p>
            )}
            {errorInfo}

            {loadingInfo}
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="kminchelle"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="0lelplR"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 rounded-lg"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}