import { MetadataRoute } from 'next';
import { services } from '@/app/services/services-data';
// We can't use the server-sdk here as it might not be configured with credentials
// in all environments. This sitemap will be less complete but won't crash the build.

// type Post = {
//   slug: string;
//   updatedAt?: {
//     toDate: () => Date;
//   };
//   createdAt: {
//     toDate: () => Date;
//   };
// };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nexoninc.tech';

  // 1. Get static routes
  const staticRoutes = [
    '',
    '/about',
    '/blogs',
    '/contact',
    '/portfolio',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // 2. Get dynamic service routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(), 
  }));

  // 3. Get dynamic blog post routes from Firestore (Gracefully handle failure)
  let blogRoutes: MetadataRoute.Sitemap = [];
  // try {
  //   const postsSnapshot = await firestore.collection('posts').get();
  //   const posts = postsSnapshot.docs.map(doc => doc.data() as Post);

  //   blogRoutes = posts.map((post) => {
  //       const lastModified = post.updatedAt ? post.updatedAt.toDate() : post.createdAt.toDate();
  //       return {
  //           url: `${baseUrl}/blogs/${post.slug}`,
  //           lastModified: lastModified,
  //       }
  //   });
  // } catch (error) {
  //   console.error("Error fetching posts for sitemap (server-sdk might not be configured):", error);
  //   // If Firestore fetch fails, we'll just return the static/service routes
  // }


  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
