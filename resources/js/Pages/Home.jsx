import CardLeave from "@/Components/CardLeave";
import CardStatistic from "@/Components/CardStatistic";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";

export default function Home() {
    const { leaveBalance, monthWorked, leaveUsed, auth, pendingLeaveReqs } =
        usePage().props;
    const [leaves, setLeaves] = useState([]);
    const [detail, setDetail] = useState(null);

    // Load leave request history
    useEffect(() => {
        axios.get(route("leaves")).then((response) => {
            setLeaves(response.data);
        });
    }, []);

    // Show detail of leave request
    const showDetail = (detail) => {
        setDetail(detail);
        document.getElementById("leaveDetail").showModal();
    };

    const generateBadgeColor = (status) => {
        switch (status) {
            case "Pending":
                return "badge-warning";
            case "Approved":
                return "badge-success";
            case "Rejected":
                return "badge-error";
            default:
                return "badge-primary";
        }
    };
    return (
        <AuthenticatedLayout title={"Home page"}>
            {/* Card Sumaries */}
            <div className="grid grid-rows-1 md:grid-cols-4 gap-5 w-full">
                <CardStatistic
                    title={"Anda telah bergabung selama"}
                    value={`${monthWorked} Bulan`}
                />
                <CardStatistic
                    title={"Saldo Cuti Anda"}
                    value={`${leaveBalance} Hari`}
                />
                <CardStatistic
                    title={"Cuti Terpakai"}
                    value={`${leaveUsed} Hari`}
                />
                {auth.user.dept == "hrd & GA" && (
                    <CardStatistic
                        title={"Permintaan cuti belum diproses"}
                        value={pendingLeaveReqs}
                        button={
                            pendingLeaveReqs > 0 && (
                                <Link
                                    href={route("pending-leave")}
                                    className="btn btn-primary"
                                    onClick={() => setLog()}
                                >
                                    Proses
                                </Link>
                            )
                        }
                    />
                )}
            </div>
            {/* Leave request history */}
            <h2 className="text-3xl font-semibold">Riwayat pengajuan cuti</h2>
            {leaves.map((leave) => (
                <CardLeave
                    key={leave.id}
                    onClick={() => showDetail(leave)}
                    reason={leave.reason}
                    startDate={leave.start_date}
                    endDate={leave.end_date}
                    status={leave.status}
                />
            ))}
            {leaves.length === 0 && (
                <div className="flex flex-col grow justify-center text-center gap-3">
                    <img
                        src="/images/undraw_farming_ni77.svg"
                        alt="Nothing"
                        className="h-32 md:h-52"
                    />
                    <p className="text-xl md:text-3xl">
                        Anda masih belum melakukan cuti
                    </p>
                </div>
            )}

            {/* Leave request detail alert*/}
            <dialog id="leaveDetail" className="modal">
                {detail && (
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            {`${
                                detail.reason.length > 200
                                    ? detail.reason.substring(0, 200) + "..."
                                    : detail.reason
                            } `}
                            <span
                                className={`badge ${generateBadgeColor(
                                    detail.status
                                )} text-white`}
                            >
                                {detail.status}
                            </span>
                        </h3>
                        <div className="py-4">
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
                            <p>Catatan admin :</p>
                            <p>
                                {detail.note
                                    ? detail.note
                                    : "Admin tidak memberian catatan"}
                            </p>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                )}
            </dialog>
        </AuthenticatedLayout>
    );
}
