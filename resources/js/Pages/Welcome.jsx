import GuessLayout from "@/Layouts/GuessLayout";
import { Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <GuessLayout title={"Selamat Datang!"}>
            <div className="min-h-screen w-full p-3 bg-primary flex flex-col gap-2 justify-center items-center text-center text-white font-bold text-3xl">
                <img
                    src="/images/undraw_welcoming_re_x0qo.svg"
                    alt="gmb-welcome"
                    className="h-48 md:h-96"
                />
                <h1 className="font-bold text-xl md:text-3xl">
                    Selamat datang! Silahkan masuk akun terlebih dahulu
                </h1>
                <Link href={route('login')} className="btn btn-secondary">Masuk Akun</Link>
            </div>
        </GuessLayout>
    );
}
