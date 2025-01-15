const config = {
  development: {
    apiUrl: "http://localhost:3001",
  },
  production: {
    apiUrl: "https://aluraflix-api.onrender.com", // Você precisará substituir por sua URL real após fazer o deploy da API
  },
};

const env = import.meta.env.MODE || "development";

export default config[env];
