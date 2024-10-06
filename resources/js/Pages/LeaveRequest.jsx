import CardStatistic from "@/Components/CardStatistic";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, usePage } from "@inertiajs/react";
import { React, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useEffect } from "react";

const LeaveRequest = () => {
    const { leaveBalance, errors } = usePage().props;
    const MIN_DATE = new Date();
    MIN_DATE.setDate(MIN_DATE.getDate() + 1);
    const [values, setValues] = useState({
        startDate: "",
        totalDays: "",
        reason: "",
    });

    // Handle input change
    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const submitLeaveRequest = (e) => {
        e.preventDefault();
        if (!values.startDate) {
            return;
        }
        values.startDate = new Date(values.startDate)
            .toISOString()
            .split("T")[0];
        router.post(route("leave-request-post"), values);
        setValues({
            startDate: "",
            totalDays: "",
            reason: "",
        });
    };
    return (
        <AuthenticatedLayout title={"Permintaan cuti"}>
            <div className="flex w-full justify-center">
                <form
                    onSubmit={submitLeaveRequest}
                    className="flex flex-col max-w-[720px] grow gap-3"
                >
                    {errors.error && (
                        <Alert
                            alertType={"alert-error"}
                            message={errors.error}
                        />
                    )}
                    {/* Display leave balance */}
                    <CardStatistic
                        title={"Saldo cuti anda"}
                        value={`${leaveBalance} Hari`}
                    />
                    {/* Leave reason input */}
                    <div className="flex grow flex-col">
                        <textarea
                            className="textarea textarea-bordered mt-6"
                            placeholder="Ceritakan apa yang membuatmu cuti"
                            onChange={handleChange}
                            id="reason"
                            value={values.reason}
                        ></textarea>
                        {errors.reason && (
                            <p className="text-red-700 font-normal text-md">
                                Error : {errors.reason}
                            </p>
                        )}
                    </div>
                    {/* Leave start date input */}
                    <h2 className="text-xl md:text-3xl font-semibold">
                        Kapan anda mulai cuti?
                    </h2>
                    <div className="flex flex-col grow">
                        <input
                            type="date"
                            value={values.startDate}
                            onChange={handleChange}
                            id="startDate"
                            className="input-bordered"
                        />
                        {errors.startDate && (
                            <p className="text-red-700 font-normal text-md">
                                Error : {errors.startDate}
                            </p>
                        )}
                    </div>
                    {/* Leave days input */}
                    <h2 className="text-xl md:text-3xl font-semibold">
                        Berapa hari anda cuti?
                    </h2>
                    <div className="flex flex-col grow">
                        <input
                            placeholder="Jumlah hari cuti"
                            id="totalDays"
                            type="number"
                            className="input input-bordered"
                            value={values.totalDays}
                            onChange={handleChange}
                        />
                        {errors.totalDays && (
                            <p className="text-red-700 font-normal text-md">
                                Error : {errors.totalDays}
                            </p>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Ajukan Cuti
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default LeaveRequest;
