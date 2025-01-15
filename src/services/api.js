import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const videosApi = {
  getVideos: async () => {
    const response = await api.get("/videos");
    return response.data;
  },

  addVideo: async (video) => {
    const response = await api.post("/videos", video);
    return response.data;
  },

  updateVideo: async (id, videoData) => {
    const response = await api.put(`/videos/${id}`, videoData);
    return response.data;
  },

  deleteVideo: async (id) => {
    await api.delete(`/videos/${id}`);
  },
};
