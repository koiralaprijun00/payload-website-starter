import HomePageBlogCarouselClient from './HomePageBlogCarouselClient'

interface BlogPost {
  id: string
  title: string
  slug: string
  heroImage?: { url: string; alt?: string }
}

export default function HomePageBlogCarousel({ posts }: { posts: BlogPost[] }) {
  return <HomePageBlogCarouselClient posts={posts} />
}
