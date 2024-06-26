import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
      },
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  if (!subreddit) {
    // 404 not found page from next/navigation
    return notFound();
  }

  return (
    <>
      <h1 className="font-bold text-3xl md:text4xl h-14">
        r/{subreddit.name}
      </h1>

      <MiniCreatePost session={session} />
      {/* TODO: Show posts in user feed */}
    </>
  );
};

export default page;
