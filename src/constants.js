const APP_ENV = process.env.APP_ENV || "development";

const URL_CONFIGS = {
  production: "https://mafiamaster.netlify.app/",
  development: "http://localhost:3000/",
};

export const URL = URL_CONFIGS[APP_ENV];
