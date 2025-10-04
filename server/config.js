const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://mongo:27017/mern_app',
  port: process.env.PORT || 8000,
};

export default config;
