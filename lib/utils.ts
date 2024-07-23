// tailwind
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// locals
import prisma from "@/lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to extract hashtags from content
const extractHashtags = (content: string): string[] => {
  const regex = /#[\w]+/g;
  const hashtags = content.match(regex);
  return hashtags ? hashtags.map((tag) => tag.toLowerCase()) : [];
};

export const getTrendingTopics = async () => {
  // Calculate the date 24 hours ago
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Fetch posts from the last 24 hours from the database
  const posts = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: yesterday,
      },
    },
    select: {
      content: true,
      createdAt: true,
    },
  });

  // Extract hashtags from posts and keep track of their counts and latest usage
  const hashtagCount: { [key: string]: { count: number; latest: Date } } = {};

  posts.forEach((post) => {
    const hashtags = extractHashtags(post.content);
    hashtags.forEach((tag) => {
      if (hashtagCount[tag]) {
        hashtagCount[tag].count++;
        if (post.createdAt > hashtagCount[tag].latest) {
          hashtagCount[tag].latest = post.createdAt;
        }
      } else {
        hashtagCount[tag] = { count: 1, latest: post.createdAt };
      }
    });
  });

  // Convert the hashtag count object to an array and sort it
  const sortedHashtags = Object.entries(hashtagCount)
    .sort(([, a], [, b]) => {
      if (b.count === a.count) {
        return b.latest.getTime() - a.latest.getTime(); // Sort by latest date if counts are the same
      }
      return b.count - a.count; // Sort by count
    })
    .slice(0, 5)
    .map(([hashtag, { count }]) => ({ hashtag, count }));

  console.log("Sorted Hashtags:", sortedHashtags);

  return sortedHashtags;
};
