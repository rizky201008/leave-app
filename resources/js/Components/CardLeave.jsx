import { React, useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";

const CardLeave = ({ onClick, reason, startDate, endDate, status }) => {
    const [badgeColor, setBadgeColor] = useState("badge-warning");

    useEffect(() => {
        switch (status) {
            case "Approved":
                setBadgeColor("badge-success");
                break;
            case "Rejected":
                setBadgeColor("badge-error");
                break;
            case "Pending":
                setBadgeColor("badge-warning");
                break;

            default:
                break;
        }
    }, [status]);
    return (
        <div className="flex flex-row bg-white shadow-lg w-full rounded-xl p-6 md:p-12 items-center">
            <div className="grow flex flex-col">
                <h2 className="text-xl md:text-3xl">
                    {reason}{" "}
                    <span className={`badge ${badgeColor} text-white`}>
                        {status}
                    </span>
                </h2>
                <div className="flex flex-row">
                    <p className="text-sm md:text-xl">
                        {new Date(startDate).toLocaleDateString("en-GB")} -{" "}
                        {new Date(endDate).toLocaleDateString("en-GB")}
                    </p>
                </div>
            </div>

            <button className="btn btn-primary" onClick={onClick}>
                <FaEye />
                Detail
            </button>
        </div>
    );
};

export default CardLeave;
