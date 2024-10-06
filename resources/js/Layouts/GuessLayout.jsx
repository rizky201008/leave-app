import { Head } from "@inertiajs/react";
const GuessLayout = ({ title, children }) => {
    return (
        <>
            <Head title={title} />
            <main>{children}</main>
        </>
    );
};

export default GuessLayout;
