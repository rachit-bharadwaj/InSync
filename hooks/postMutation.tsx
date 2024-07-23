import { createPost, deletePost } from "@/server-actions/post";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSubmitPostMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );
      toast.success("Post created");
    },
    onError: () => {
      toast.error("Failed to create post. Try again");
    },
  });

  return mutation;
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (oldData) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: oldData.pages[0].posts.filter(
                    (post) => post.id !== deletedPost.id
                  ),
                  nextCursor: oldData.pages[0].nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );

      toast.success("Post deleted");
      if (pathname === `/posts/${deletedPost.id}`) {
        router.push("/");
      }
    },
    onError: () => {
      toast.error("Failed to delete post. Try again");
    },
  });
}
