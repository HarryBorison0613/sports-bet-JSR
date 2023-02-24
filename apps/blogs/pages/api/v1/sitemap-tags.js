import { getAllTags } from '@/lib/api';
import { SitemapStream, streamToPromise } from 'sitemap';

export default async (req, res) => {
  //const webUrl = `https://${req.headers.host}`;
  const webUrl = 'https://www.bets.com.br';
  try {
    const smStream = new SitemapStream({
      hostname: webUrl,
      cacheTime: 600000,
    });

    // List of posts
    const posts = await getAllTags();

    // Create each URL row
    posts.forEach(post => {
      smStream.write({
        url: `/artigos/tag/${post.slug}`,
        changefreq: 'daily',
        priority: 0.8
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    res.send(JSON.stringify(e))
  }
}