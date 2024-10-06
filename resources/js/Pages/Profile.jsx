import Alert from "@/Components/Alert";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

const Profile = () => {
    const { auth, errors } = usePage().props;
    const [values, setValues] = useState({
        password: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const changePassword = (e) => {
        e.preventDefault();
        router.put(route("update-password"), values);
    };
    return (
        <AuthenticatedLayout title={"Profil anda"}>
            <div className="row rounded-lg p-3 flex gap-3 flex-col mt-6 md:mt-12">
                <div className="">
                    <h2 className="text-xl md:text-3xl font-semibold">Halo</h2>
                    <p className="text-3xl md:text-6xl font-bold">
                        {auth.user.name.split(" ")[0]}
                    </p>
                </div>

                <div className="">
                    <h2 className="text-xl md:text-3xl">Data diri anda</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Nama Lengkap</td>
                                    <td>: {auth.user.name}</td>
                                </tr>
                                <tr>
                                    <td>Tempat Lahir</td>
                                    <td>: {auth.user.birth_place}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Lahir</td>
                                    <td>: {auth.user.birth_date}</td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin</td>
                                    <td>
                                        :{" "}
                                        {auth.user.sex === "M"
                                            ? "Laki-laki"
                                            : "Perempuan"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="divider"></div>
                <div className="">
                    <h2 className="text-xl md:text-3xl">Data pekerjaan</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Tanggal awal bekerja</td>
                                    <td>: {auth.user.join_date}</td>
                                </tr>
                                <tr>
                                    <td>Departemen</td>
                                    <td>: {auth.user.dept}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>: {auth.user.status}</td>
                                </tr>
                                <tr>
                                    <td>Judul pekerjaan</td>
                                    <td>: {auth.user.job_title}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="">
                    {errors.error && (
                        <Alert
                            alertType={"alert-error"}
                            message={errors.error}
                        />
                    )}
                    <h2 className="text-xl md:text-3xl">Ubah kata sandi</h2>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={changePassword}
                    >
                        <div className="flex flex-col">
                            <input
                                id="password"
                                type="password"
                                placeholder="Masukkan kata sandi lama"
                                className="input input-bordered w-full"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="text-red-700 font-normal text-md">
                                    Error : {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input
                                id="newPassword"
                                type="password"
                                placeholder="Masukkan kata sandi baru"
                                className="input input-bordered w-full"
                                value={values.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Ubah kata sandi
                        </button>
                        <p className="font-bold">
                            Setelah kata sandi diubah anda wajib melakukan login
                            ulang
                        </p>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Profile;
