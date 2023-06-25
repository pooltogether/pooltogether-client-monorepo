module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    'file:../../shared/generic-react-hooks',
    'file:../../shared/react-components',
    'file:../../shared/types',
    'file:../../shared/ui',
    'file:../../shared/utilities'
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false }
    }
    return config;
  },
  i18n: {
    locales: ['en', 'es', 'de', 'fr', 'hi', 'it', 'ko', 'pt', 'tr', 'zh'],
    defaultLocale: 'en'
  }
};
