
import Link from 'next/link';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';
import { INewsArticle } from '../types/latestNews';

const Marquee = async () => {
    const res = await fetch(
        'https://news-api-v2.vercel.app/api/news?limit=10',
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch latest news');
    }

    const data = await res.json();
    const latestNews: INewsArticle[] = data.data ?? [];

    return (
        <section
            aria-label="সর্বশেষ সংবাদ"
            className="relative overflow-hidden border-b border-red-700/20 bg-gradient-to-r from-red-700 via-red-600 to-rose-600 shadow-md"
        >
            <div className="mx-auto flex min-h-12 max-w-7xl items-stretch px-0 sm:px-6 lg:px-8">

                {/* Breaking news label */}
                <div className="relative z-10 flex shrink-0 items-center gap-2 bg-red-800 px-3 text-white shadow-md sm:rounded-l-lg sm:px-5">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                    </span>

                    <span className="whitespace-nowrap text-xs font-extrabold tracking-wide sm:text-sm">
                        সর্বশেষ
                    </span>

                    <span className="hidden text-white/70 sm:inline">|</span>

                    <span className="hidden whitespace-nowrap text-xs font-medium text-white/90 sm:inline">
                        সংবাদ
                    </span>

                    {/* Angled edge */}
                    <span
                        aria-hidden="true"
                        className="absolute -right-2 top-0 h-full w-4 skew-x-[-12deg] bg-red-800"
                    />
                </div>

                {/* Scrolling headlines */}
                <div className="min-w-0 flex-1 overflow-hidden py-3 pl-5 sm:pl-7">
                    {latestNews.length > 0 ? (
                        <MarqueeText
                            direction="right"
                            duration="15"
                        >
                            <div className="flex items-center gap-8 pr-8">
                                {latestNews.map((newsItem) => (
                                    <Link
                                        key={newsItem.id}
                                        href={newsItem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex shrink-0 items-center gap-3 text-sm font-medium text-white/95 transition-colors hover:text-white"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[10px] font-black text-white transition-colors group-hover:bg-white/30">
                                            ›
                                        </span>

                                        <span className="max-w-[280px] truncate sm:max-w-none">
                                            {newsItem.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </MarqueeText>
                    ) : (
                        <p className="text-sm text-white/90">
                            এই মুহূর্তে কোনো সংবাদ পাওয়া যাচ্ছে না।
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Marquee;
