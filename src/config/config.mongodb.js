"use strict";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },

  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: process.env.DEV_DB_PORT || "27017",
    name: process.env.DEV_DB_NAME || "sharingFile",
  },
};

const config = { dev };

const env = process.env.NODE_ENV || "dev";
console.log(config[env], `Env:: ${env}`);
export default config[env];
