
import NewsCard from "@/app/components/NewsCard";
import { INewsArticle } from "@/app/types/latestNews";

const CategoryPage = async ({
    params,
}: {
    params: Promise<{ categoryId: string }>;
}) => {
    const { categoryId } = await params;

    const res = await fetch(
        `https://news-api-v2.vercel.app/api/category/${categoryId}`,
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category news");
    }

    const data = await res.json();
    const categoryNews: INewsArticle[] = data.data ?? [];
    console.log("Category News:", categoryNews); // Log the fetched news articles for debugging

    return (
        <main className="min-h-screen bg-gray-50/70">

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

 
                {/* News Section */}
                <section>

                    {/* Section Title */}
                    <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

                        <div className="flex items-center gap-3">
                            <span className="h-7 w-1 rounded-full bg-red-600" />

                            <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                                {categoryNews[0]?.category} বিভাগের সকল সংবাদ
                            </h2>
                        </div>

                        <span className="text-xs font-semibold text-red-400">
                            সর্বশেষ সংবাদ
                        </span>

                    </div>

                    {/* News Grid */}
                    {categoryNews.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {categoryNews.map((news: INewsArticle) => (
                                <NewsCard
                                    key={news.id}
                                    news={news}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                                <span className="text-2xl text-red-500">
                                    !
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800">
                                কোনো সংবাদ পাওয়া যায়নি
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                এই বিভাগে বর্তমানে কোনো সংবাদ প্রকাশিত হয়নি।
                            </p>
                        </div>
                    )}

                </section>

            </div>
        </main>
    );
};

export default CategoryPage;
