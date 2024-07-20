/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "@node-rs/argon2": "commonjs @node-rs/argon2",
      });
    }

    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    return config;
  },
};

export default nextConfig;
