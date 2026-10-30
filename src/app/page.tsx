import MainNews from "./components/MainNews";
import Marquee from "./components/Marquee";
import { ISection } from "./types/NewsSection";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const data = await res.json();
  const sections = data.data ?? [];
  const mainSection = sections[0].articles || [];
  const othersSection = sections.slice(1) || [];

  // console.log("Fetched sections:", sections);

  return (
    <div >
      <Marquee />
      <div>
        <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Main News Section */}
          <div className="col-span-2 grid gap-2">
            <MainNews news={mainSection} />

            {/* Others News Section */}
            <div>
              {othersSection.map((section: ISection) => (
                <div
                  key={section.curationId}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {section.title}
                  </h2>

                </div>
              ))}
            </div>
          </div>

          {/* Most Read Section */}
          < div className="col-span-1" >
            <p>Most Read News</p>
          </div>
        </div>
      </div>
    </div>
  );
}