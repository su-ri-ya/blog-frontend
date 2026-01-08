import api from "@/lib/api";

export const createMovieArticle = (formData) =>
  api.post("/movies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getMovieArticle = async ({
  page = 1,
  limit = 10,
  search = "",
} = {}) => {
  const res = await api.get("/movies", {
    params: { page, limit, search },
  });

  return res.data; // ✅ NOT res.data.movies
};

export const deleteMovieArticle = (id) => api.delete(`/movies/${id}`);
