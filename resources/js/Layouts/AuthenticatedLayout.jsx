import Navbar from "@/Components/Navbar";
import { Head, usePage } from "@inertiajs/react";

const AuthenticatedLayout = ({ title, children }) => {
    const { auth } = usePage().props;
    return (
        <>
            <Head title={title} />
            <Navbar user={auth.user} />
            <main>
                <div className="flex flex-col gap-3 w-full pt-12 md:pt-16 py-4 px-6 md:px-12">
                    {children}
                </div>
            </main>
        </>
    );
};

export default AuthenticatedLayout;
