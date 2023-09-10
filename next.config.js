/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimizing Remote Images
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "/photos/**",
            },
        ],
    },
};

module.exports = nextConfig;
