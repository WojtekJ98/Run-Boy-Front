/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "runboy-nextjs.s3.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
