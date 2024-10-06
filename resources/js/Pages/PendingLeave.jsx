import Alert from "@/Components/Alert";
import CardLeave from "@/Components/CardLeave";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

const PendingLeave = () => {
    const { pendingLeaveReqs, errors } = usePage().props;
    const [detail, setDetail] = useState(null);
    const [values, setValues] = useState({
        note: null,
        status: "",
    });
    const dialogDetail = document.getElementById("leaveDetail");

    // Handle show detail of leave request
    const showDetail = (detail) => {
        setDetail(detail);
        dialogDetail.showModal();
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

    // Handle process leave request
    const processLeaveRequest = (e) => {
        e.preventDefault();
        if (values.status === "") {
            return;
        }
        const data = {
            ...values,
            id: detail.id,
        };
        router.put(route("pending-leave-put", data));
        dialogDetail.close();
    };
    return (
        <AuthenticatedLayout title={"Permintaan belum diproses"}>
            {errors.error && (
                <Alert alertType={"alert-error"} message={errors.error} />
            )}

            {/* List of pending leave request */}
            {pendingLeaveReqs.map((leave) => (
                <CardLeave
                    key={leave.id}
                    reason={leave.reason}
                    startDate={leave.start_date}
                    endDate={leave.end_date}
                    status={leave.status}
                    onClick={() => showDetail(leave)}
                />
            ))}

            {pendingLeaveReqs.length === 0 && (
                <div className="flex flex-col grow justify-center text-center gap-3">
                    <img
                        src="/images/undraw_farming_ni77.svg"
                        alt="Nothing"
                        className="h-32 md:h-52"
                    />
                    <p className="text-xl md:text-3xl">
                        Semua permintaan telah anda proses
                    </p>
                </div>
            )}

            {/* Leave request detail dialog / modal*/}
            <dialog id="leaveDetail" className="modal">
                {detail && (
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            {`${
                                detail.reason.length > 200
                                    ? detail.reason.substring(0, 200) + "..."
                                    : detail.reason
                            } `}
                            <span className={`badge badge-warning text-white`}>
                                {detail.status}
                            </span>
                        </h3>
                        <form
                            onSubmit={processLeaveRequest}
                            className="py-4 flex flex-col gap-3"
                        >
                            <p>
                                Tanggal pengajuan:{" "}
                                {new Date(detail.created_at).toLocaleDateString(
                                    "en-GB"
                                )}
                            </p>
                            <p>
                                Periode cuti:{" "}
                                {`${new Date(
                                    detail.start_date
                                ).toLocaleDateString("en-GB")} - ${new Date(
                                    detail.end_date
                                ).toLocaleDateString("en-GB")} (${
                                    detail.total_days
                                } Hari)`}
                            </p>
                            <div className="divider"></div>

                            {/* Status input */}
                            <div className="flex flex-col grow">
                                <p className="text-lg md:text-xl">
                                    Ubah status
                                </p>
                                <select
                                    className="select select-bordered w-full"
                                    value={values.status}
                                    onChange={handleChange}
                                    id="status"
                                >
                                    <option disabled>Pilih Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                {errors.reason && (
                                    <p className="text-red-700 font-normal text-md">
                                        Error : {errors.status}
                                    </p>
                                )}
                            </div>
                            
                            {/* Note input */}
                            <div className="flex flex-col grow">
                                <p className="text-lg md:text-xl">
                                    Tambahkan catatan
                                </p>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Tuliskan catatan anda"
                                    onChange={handleChange}
                                    id="note"
                                    value={values.note ? values.note : ""}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary grow"
                            >
                                Simpan
                            </button>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                )}
            </dialog>
        </AuthenticatedLayout>
    );
};
export default PendingLeave;
