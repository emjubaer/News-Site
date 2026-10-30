import Image from "next/image";
import { INewsArticle } from "../types/latestNews";
import Link from "next/link";

const MainNews = ({ news }: { news: INewsArticle[] }) => {

    const [firstNews, ...othersNews] = news;

    if (!firstNews) {
        return <p>No news available.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First News */}
            <Link href={`/news/${firstNews.id}`}>
                <div className="card bg-base-100 shadow-sm">
                    <figure>
                        <Image
                            src={firstNews.imageUrl}
                            alt={firstNews.imageAlt || "News Image"}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </figure>

                    <div className="card-body">
                        <h4 className="text-sm font-medium text-red-600">
                            {firstNews.category}
                        </h4>

                        <h2 className="card-title">
                            {firstNews.title}
                        </h2>

                        <p>{firstNews.description}</p>
                    </div>
                </div>
            </Link>

            {/* Other News */}

            <div className="grid gap-2">
                {othersNews.slice(0, 5).map((item) => (
                    <Link key={item.id} href={`/news/${item.id}`}>
                        <div className="p-2 border rounded-md">
                            <h4 className="text-sm font-medium text-red-600">
                                {item.category}
                            </h4>

                            <h3 className="font-semibold">
                                {item.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    );
};

export default MainNews;