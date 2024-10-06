import Alert from "@/Components/Alert";
import GuessLayout from "@/Layouts/GuessLayout";
import { react, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usePage, router } from "@inertiajs/react";

export default function Login() {
    const { csrf_token, errors, success } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        id: null,
        password: null,
        _token: csrf_token,
    });

    // Change password visibility
    const changePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle input change
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    // Handle login process
    const processLogin = (e) => {
        e.preventDefault();
        router.post(route("login-post"), values);
    };

    return (
        <GuessLayout title={"Masuk akun"}>
            <div className="p-3 min-h-screen w-full flex justify-center items-center">
                <div className="flex w-full max-w-3xl flex-col gap-3">
                    {errors.error && (
                        <Alert
                            alertType={"alert-error"}
                            message={errors.error}
                        />
                    )}
                    {success && (
                        <Alert alertType={"alert-success"} message={success} />
                    )}

                    <img
                        src="/images/undraw_login_re_4vu2.svg"
                        alt="login image"
                        className="h-48 md:h-96"
                    />
                    <form
                        onSubmit={processLogin}
                        className="flex flex-col gap-3 grow"
                    >
                        {/* Input user id */}
                        <div className="grow flex flex-col">
                            <input
                                id="id"
                                type="number"
                                placeholder="UserID"
                                className="input input-bordered grow"
                                value={values.id}
                                onChange={handleChange}
                            />
                            {errors.id && (
                                <p className="text-red-700 font-normal text-md">
                                    Error : {errors.id}
                                </p>
                            )}
                        </div>
                        {/* Input password */}
                        <div className="flex grow flex-col">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered grow"
                                />
                                {showPassword ? (
                                    <FaEye
                                        size={30}
                                        onClick={changePasswordVisibility}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        size={30}
                                        onClick={changePasswordVisibility}
                                    />
                                )}
                            </div>
                            {errors.password && (
                                <p className="text-red-700 font-normal text-md">
                                    Error : {errors.password}
                                </p>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary grow">
                            Masuk Akun
                        </button>
                    </form>
                </div>
            </div>
        </GuessLayout>
    );
}
