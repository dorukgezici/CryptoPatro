import { useStore } from "@nanostores/react";
import type { CryptopanicNews } from "@/types";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { $news } from "@/store/news";

export function News() {
  const { data: posts } = useStore($news);

  return (
    <>
      <h1>News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </>
  );
}

export function BlogCard({ post }: { post: CryptopanicNews }) {
  return (
    <Card key={post.id}>
      <CardHeader>
        <img
          src="/img/avatar.jpg"
          width={600}
          height={400}
          alt={post.title}
          className="aspect-[3/2] object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="inline-block rounded-md bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
          {post.source.title}
        </div>
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p>{formatDate(post.published_at)}</p>
      </CardContent>
    </Card>
  );
}
