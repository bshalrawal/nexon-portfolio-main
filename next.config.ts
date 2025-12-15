<<<<<<< HEAD

import type { NextConfig } from 'next';
=======
import type {NextConfig} from 'next';
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
<<<<<<< HEAD

      {
        protocol: 'https',
        hostname: 'img.pikbest.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
<<<<<<< HEAD
      }
    ],
  },
  experimental: {
    // allowedDevOrigins: [
    //     "https://6000-firebase-studio-1762781607376.cluster-euie3bjlbvhliv5fpqv5ofgi46.cloudworkstations.dev",
    // ]
  }
=======
      },
    ],
  },
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
};

export default nextConfig;
