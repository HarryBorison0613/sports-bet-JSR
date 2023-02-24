import RSS from 'rss';
import { getAllPostsWithSlug } from '@/lib/api'

export async function getServerSideProps({ res }) {
  const siteURL = 'https://www.bets.com.br/artigos';
  const feed = new RSS({
    title: "Bets.com.br",
    description: "O Melhor site de notícias esportivas no Brasil - Bets.com.br",
    site_url: siteURL,
    feed_url: `${siteURL}/feed.xml`,
    language: "pt_BR",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Bets.com.br`,
  });

  const allPosts = await getAllPostsWithSlug();
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      id: `${siteURL}/${post.slug}`,
      url: `${siteURL}/${post.slug}`,
      date: post.created_at,
      description: post.excerpt,
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {}
  };
}

export default function RSSFeed() {
  return null;
}