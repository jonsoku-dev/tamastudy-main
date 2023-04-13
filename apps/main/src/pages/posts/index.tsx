import { NextPage } from "next";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import http from "http";
import https from "https";
import { Post } from "@prisma/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

type FormValues = {
  topic: string;
  keywords: string;
};

const PostsPage: NextPage = () => {
  const formMethods = useForm<FormValues>();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["/api/posts"],
    queryFn: async ({ queryKey, signal }) => {
      const response = await axios.get<{ result: Post[] }>(queryKey[0], {
        signal,
        timeout: 1000000000,
        httpAgent,
        httpsAgent,
      });
      return response.data;
    },
    keepPreviousData: true,
    suspense: false,
  });

  const { mutate, isLoading: isMutateLoading } = useMutation<
    Response,
    AxiosError,
    { topic: string; keywords: string },
    Response
  >({
    mutationFn: async (post) => {
      const response = await axios.post("/api/posts", post, {
        timeout: 60 * 60 * 24 * 30, // 30 days
        httpAgent,
        httpsAgent,
      });
      return response.data;
    },
  });

  return (
    <div>
      <div>
        <h4>Create</h4>
        <div>
          <form
            onSubmit={formMethods.handleSubmit((data) => {
              mutate({
                topic:
                  data.topic ?? "Top 10 travel tips for travelling to korea",
                keywords:
                  data.keywords ??
                  "korea travel guide, seoul tourist traps, seoul travel tips",
              });
            })}
          >
            <Controller
              render={({ field, fieldState, formState }) => {
                return (
                  <label htmlFor="post-topic">
                    <span>Topic</span>
                    <input id="post-topic" {...field} />
                  </label>
                );
              }}
              name={"topic"}
              control={formMethods.control}
              defaultValue={""}
            />
            <Controller
              render={({ field, fieldState, formState }) => {
                return (
                  <label htmlFor="post-keywords">
                    <span>Keywords</span>
                    <input id="post-keywords" {...field} />
                  </label>
                );
              }}
              name={"keywords"}
              control={formMethods.control}
              defaultValue={""}
            />
            <button type="submit" disabled={isMutateLoading}>
              Create
            </button>
          </form>
        </div>
      </div>
      <div>
        {isFetching
          ? "loading ..."
          : data?.result.map((post) => (
              <div key={post.id}>
                <h2>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <h4>{post.topic}</h4>
                <p>{post.keywords}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PostsPage;

export const getServerSideProps = withPageAuthRequired();
