
import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';
import NavLinks from './NavLinks';

const Header = async () => {
    await connection();

    const dateTime = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400" />

            {/* Main masthead */}
            <div className="border-b border-gray-100 bg-white/95 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">

                        {/* Brand */}
                        <Link
                            href="/"
                            aria-label="Bangla News 24 home"
                            className="group flex min-w-0 items-center gap-3"
                        >
                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 group-hover:shadow-md sm:h-[68px] sm:w-[68px]">
                                <Image
                                    src="/News18_Bangla_logo.jpeg"
                                    alt="Bangla News 24 logo"
                                    width={68}
                                    height={68}
                                    priority
                                    className="h-full w-full object-contain p-1"
                                />
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-black leading-none tracking-tight text-gray-950 sm:text-3xl">
                                        Bangla News
                                        <span className="text-red-600"> 24</span>
                                    </h1>

                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-600">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                                        </span>
                                        Live
                                    </span>
                                </div>

                                <p className="mt-2 text-xs font-medium text-gray-500 sm:text-sm">
                                    {dateTime}
                                </p>
                            </div>
                        </Link>

                        {/* Account actions */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href="/login"
                                className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:flex-none sm:px-5"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/register"
                                className="inline-flex flex-1 items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-red-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:translate-y-0 sm:flex-none sm:px-5"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category navigation */}
            <NavLinks />

            {/* Bottom accent */}
            <div className="h-px w-full bg-gray-200" />
        </header>
    );
};

export default Header;
