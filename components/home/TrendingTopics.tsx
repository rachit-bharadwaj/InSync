import { getTrendingTopics } from "@/lib/utils";
import Link from "next/link";

export default async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();
  console.log("Trending Topics:", trendingTopics);

  return (
    <div className="space-y-5 rounded-2xl bg-secondary p-5 shadow-sm">
      <div className="text-xl font-bold">Trending Topics</div>

      <div className="space-y-2">
        {trendingTopics.map(({ hashtag, count }) => {
          const title = hashtag.split("#")[1];
          return (
            <Link key={title} href={`/hashtag/${title}`} className="block">
              <p
                className="line-clamp-1 break-all font-semibold hover:underline"
                title={hashtag}
              >
                {hashtag}
              </p>

              <p className="text-sm text-muted-foreground">
                {count} {count === 1 ? "post" : "posts"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
