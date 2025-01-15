const config = {
  development: {
    apiUrl: "http://localhost:3001",
  },
  production: {
    apiUrl: "https://aluraflix-api-lq35.onrender.com",
  },
};

const env = import.meta.env.MODE || "development";

export default config[env];
