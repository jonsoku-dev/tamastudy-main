import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import http from "http";
import https from "https";
import { Post } from "@prisma/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const PostDetail: NextPage = () => {
  const router = useRouter();
  const postId = router.query.postId as string | undefined;
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["post", postId],
    queryFn: async ({ queryKey, signal }) => {
      const url = `/api/posts/${postId}`;
      const response = await axios.get<{ result: Post }>(url, {
        signal,
        httpAgent,
        httpsAgent,
      });
      return response.data;
    },
    suspense: false,
    enabled: postId !== undefined,
  });

  return (
    <div>
      <div>
        {isFetching
          ? "loading ..."
          : data?.result && (
              <div key={data.result.id}>
                <h2>
                  <Link href={`/data.results/${data.result.id}`}>
                    {data.result.title}
                  </Link>
                </h2>
                <h4>{data.result.topic}</h4>
                <p>{data.result.keywords}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: data.result.postContent }}
                ></div>
              </div>
            )}
      </div>
    </div>
  );
};

export default PostDetail;

export const getServerSideProps = withPageAuthRequired();
