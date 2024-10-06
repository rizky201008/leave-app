import { Link, router } from "@inertiajs/react";
import ProfileImage from "./ProfileImage";

const Navbar = ({ user }) => {

    // Handle logout
    const logout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="navbar bg-base-100 fixed">
            <div className="flex-1">
                <Link href="/home" className="btn btn-ghost text-xl">
                    Zemangat
                </Link>
            </div>
            <div className="flex-none">
                <Link href={route("leave-request")} className="btn btn-ghost">
                    Ajukan Cuti
                </Link>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <ProfileImage name={user.name} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link href={route('profile')}>Profile</Link>
                        </li>
                        <li>
                            <span onClick={logout}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
