
import Image from "next/image";

const NewsPageDetails = async ({ params }) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news details");
  }

  const result = await res.json();
  const news = result.data;

  if (!news) {
    return <div className="text-center py-20">News not found!</div>;
  }

  const publishedDate = new Date(
    news.firstPublished
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* Category / Source */}
      <div className="mb-5">
        <span className="text-sm font-semibold text-red-600">
          {news.source}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
        {news.title}
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
        {news.description?.blocks?.map(
          (block, index) => (
            <span key={index}>
              {typeof block === "string"
                ? block
                : block.text || ""}
            </span>
          )
        )}
      </p>

      {/* Author & Date */}
      <div className="flex flex-wrap justify-between items-center gap-3 border-y py-4 mb-6">
        <div>
          <p className="font-semibold">
            {news.byline?.map((author) => author.name).join(", ")}
          </p>
          <p className="text-sm text-gray-500">
            {publishedDate}
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {news.wordCount} words
        </span>
      </div>

      {/* Featured Image */}
      {news.imageUrl && (
        <figure className="mb-10">
          <Image
            src={news.imageUrl}
            alt={news.title}
            width={1200}
            height={675}
            className="w-full h-auto rounded-xl"
            priority
            unoptimized
          />
        </figure>
      )}

      {/* Article Body */}
      <article className="max-w-3xl mx-auto">

        {news.body?.map((item, index) => {

          if (item.type === "image") {
            return (
              <figure key={index} className="my-8">
                <Image
                  src={item.url}
                  alt={item.altText || news.title}
                  width={item.width || 1200}
                  height={item.height || 675}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />

                {item.caption && (
                  <figcaption className="text-sm text-gray-500 mt-2">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          if (item.type === "text") {
            return (
              <p
                key={index}
                className="text-lg leading-8 text-gray-800 mb-6"
              >
                {item.text}
              </p>
            );
          }

          return null;
        })}

        {/* Source */}
        <div className="border-t mt-10 pt-5 text-sm text-gray-500">
          Source: {news.source} ·{" "}
          <a
            href={news.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Original Article
          </a>
        </div>

      </article>

    </main>
  );
};

export default NewsPageDetails;
