
import Image from 'next/image';
import { connection } from 'next/server';
import NavLinks from './NavLinks';

const Header = async () => {
    await connection();

    const dateTime = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

                {/* Logo and Brand */}
                <div className="flex min-w-0 items-center gap-3">
                    <div className="shrink-0 overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-200">
                        <Image
                            src="/News18_Bangla_logo.jpeg"
                            alt="Bangla News 24 Logo"
                            width={64}
                            height={64}
                            priority
                            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                                Bangla News
                                <span className="text-red-600"> 24</span>
                            </h1>

                            <span className="rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600 ring-1 ring-red-100">
                                Live News
                            </span>
                        </div>

                        <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                            {dateTime}
                        </p>
                    </div>
                </div>

                {/* Authentication Actions */}
                <div className="flex items-center gap-2 sm:shrink-0">
                    <button
                        type="button"
                        className="flex-1 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:flex-none"
                    >
                        সাইন ইন
                    </button>

                    <button
                        type="button"
                        className="flex-1 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[0.98] sm:flex-none"
                    >
                        সাইন আপ
                    </button>
                </div>

            </div>

            <NavLinks />

            {/* Accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400" />
        </header>
    );
};

export default Header;
