import { useState } from "react";
import loginBg from "@assets/login.svg";
import logo from "@assets/logo.png";
import { useAuthContext } from "@hooks/context/useAuthContext";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { LoginPayload } from "@interfaces/usersTypes";

const Login = () => {
    const { loginAdmin } = useAuthContext();
    const navigate = useNavigate();
    const { login, isLoading } = loginAdmin;

    const [formData, setFormData] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            toast.success(response?.message || "Login successful!");
            navigate("/");
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data?.message || "Login failed!";
                toast.error(errorMessage);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen text-gray-900 flex justify-center items-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                {/* LEFT SECTION */}
                <div className="lg:w-1/2 px-6 py-20 sm:px-12">
                    <div className="flex justify-center">
                        <img src={logo} alt="Logo" className="w-32" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Login with e-mail
                                </div>
                            </div>

                            <form onSubmit={onSubmit} className="mx-auto max-w-xs">
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
                  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
                  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-5 tracking-wide font-semibold bg-default-500 text-gray-100 w-full py-4 
                  rounded-lg hover:bg-default-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <span className="ml-2">Logging in...</span>
                                    ) : (
                                        <>
                                            <svg
                                                className="w-6 h-6 -ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy={7} r={4} />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">Login</span>
                                        </>
                                    )}
                                </button>

                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    By logging in, you agree to our{" "}
                                    <a
                                        href="#"
                                        className="border-b border-gray-500 border-dotted"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="border-b border-gray-500 border-dotted"
                                    >
                                        Privacy Policy
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex-1 bg-default-100 text-center hidden lg:flex p-20">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${loginBg})` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
