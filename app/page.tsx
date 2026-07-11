import { Intro } from "@/components/intro";
import { RecentPosts } from "@/components/recent-posts";
import { RecentProjects } from "@/components/recent-projects";

export default function Home() {
  return (
    <>
      <Intro />
      <RecentPosts />
      <RecentProjects />
    </>
  );
}
