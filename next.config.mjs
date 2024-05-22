/** @type {import('next').NextConfig} */

const config = {
  production: {
    env: {
      APP_ENV: process.env.NODE_ENV,
    },
  },
  development: {
    env: {
      APP_ENV: process.env.NODE_ENV,
    },
  },
};

export default config[process.env.NODE_ENV];
