import Image from "next/image";
import { INewsArticle } from "../types/latestNews";
import Link from "next/link";

const NewsCard = ({ news }: { news: INewsArticle }) => {

    return (
        <Link href={`/news/${news.id}`}>
            <div className="card bg-base-100 shadow-sm">
                <figure>
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt || "News Image"}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                    />
                </figure>

                <div className="card-body">
                    <h4 className="text-sm font-medium text-red-600">
                        {news.category}
                    </h4>

                    <h2 className="card-title">
                        {news.title}
                    </h2>

                    <p>{news.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;