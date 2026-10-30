
import MainNews from "./components/MainNews";
import Marquee from "./components/Marquee";
import NewsCard from "./components/NewsCard";
import { INewsArticle } from "./types/latestNews";
import { ISection } from "./types/NewsSection";

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const data = await res.json();
  const sections: ISection[] = data.data ?? [];

  const mainSection = sections[0]?.articles ?? [];
  const othersSection = sections.slice(1);

  return (
    <main className="min-h-screen bg-gray-50/70">

      {/* Breaking News */}
      <Marquee />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Main News and Other Sections */}
          <div className="min-w-0 space-y-8 lg:col-span-8">

            {/* Main News */}
            <section aria-label="প্রধান সংবাদ">
              <MainNews news={mainSection} />
            </section>

            {/* Other News Sections */}
            <div className="space-y-9">
              {othersSection.map((section: ISection) => (
                <section
                  key={section.curationId}
                  className="min-w-0"
                >
                  {/* Section Heading */}
                  <div className="mb-4 flex items-center justify-between border-b border-red-500 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-1 rounded-full bg-red-600" />

                      <h2 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
                        {section.title}
                      </h2>
                    </div>

                    <span className="text-xs font-semibold text-red-600">
                      সর্বশেষ সংবাদ
                    </span>
                  </div>

                  {/* News Cards */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {section.articles?.map((article: INewsArticle) => (
                      <NewsCard
                        key={article.id}
                        news={article}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>


          {/* Most Read Section */}
          <aside className="min-w-0 lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
                <span className="h-7 w-1 rounded-full bg-red-600" />

                <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
                  Most Read News
                </h2>
              </div>

              <div className="py-6 text-center">
                <p className="text-sm font-medium text-gray-400">
                  Most read news will appear here.
                </p>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
