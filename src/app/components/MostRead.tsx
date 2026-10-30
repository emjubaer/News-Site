
import Link from "next/link";
import { INewsArticle } from "../types/latestNews";

const MostRead = async () => {
    const res = await fetch(
        "https://news-api-v2.vercel.app/api/news/most-read",
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch most read news");
    }

    const data = await res.json();
    const mostReadNews: INewsArticle[] = data.data ?? [];

    return (
        <div className="divide-y divide-gray-100">
            {mostReadNews.map((news, index) => (
                <article
                    key={news.id}
                    className="group flex gap-4 py-4 first:pt-1 last:pb-1"
                >
                    {/* Ranking Number */}
                    <div className="flex shrink-0 items-start">
                        <span
                            className={`
                                flex h-10 w-10 items-center justify-center
                                rounded-xl text-lg font-black
                                transition-all duration-300
                                group-hover:scale-110
                                ${index < 3
                                    ? "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white"
                                    : "bg-gray-50 text-gray-400 group-hover:bg-red-50 group-hover:text-red-600"
                                }
                            `}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>

                    {/* News Content */}
                    <div className="min-w-0 flex-1">
                        <Link
                            href={`/news/${news.id}`}
                            className="block"
                        >
                            <h3 className="text-sm font-bold leading-6 text-gray-800 transition-colors duration-200 group-hover:text-red-600 sm:text-[15px]">
                                {news.title}
                            </h3>
                        </Link>

                        {/* Trending Label */}
                        {index < 3 && (
                            <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                                </span>
                                Trending
                            </div>
                        )}
                    </div>

                    {/* Arrow */}
                    <div className="flex shrink-0 items-center">
                        <span className="text-lg text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-red-500">
                            →
                        </span>
                    </div>

                </article>
            ))}
        </div>
    );
};

export default MostRead;
