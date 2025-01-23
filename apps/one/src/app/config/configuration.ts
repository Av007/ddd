export default () => ({
    database: {
      url: process.env.DATABASE_URL,
      name: process.env.DATABASE_NAME
    },
    redis: {
      host: process.env.REDIS_HOST
    }
  });
