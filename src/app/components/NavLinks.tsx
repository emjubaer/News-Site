
import Link from 'next/link';
import { ICategory } from '../types/categoryTypes';

const NavLinks = async () => {
    const res = await fetch(
        'https://news-api-v2.vercel.app/api/categories',
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }

    const data = await res.json();

    const categories: ICategory[] = data.data ?? [];

    const filteredCategories = categories.filter(
        (category) => category.scrapable
    );

    return (
        <nav
            aria-label="Main navigation"
            className="sticky top-[88px] z-40 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl sm:top-[105px]"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                    {/* Home link */}
                    <Link
                        href="/"
                        className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-red-600/20 transition-all duration-200 hover:bg-red-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="m3 10 9-7 9 7" />
                            <path d="M9 21V9h6v12" />
                            <path d="M4 10v11h16V10" />
                        </svg>
                        প্রচ্ছদ
                    </Link>

                    <span className="mx-1 h-6 w-px shrink-0 bg-gray-200" />

                    {/* Category links */}
                    {filteredCategories.map((category, index) => (
                        <Link
                            key={index}
                            href={`/categories/${category.slug}`}
                            className="group relative inline-flex shrink-0
                             items-center rounded-xl px-4 py-2.5 text-sm font-semibold
                              text-gray-600 transition-all duration-200 hover:bg-red-50
                               hover:text-red-600 focus-visible:outline-none
                                focus-visible:ring-2 focus-visible:ring-red-500"
                        >
                            <span className="relative z-10">
                                {category.title}
                            </span>

                            <span className="absolute inset-x-3 bottom-1 h-0.5 origin-center
                             scale-x-0 rounded-full bg-red-600 transition-transform duration-200
                             group-hover:scale-x-100" />
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavLinks;
