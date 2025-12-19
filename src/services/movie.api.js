import api from "@/lib/api";

export const createMovieArticle = (formData)=>{
  return api.post("/movies",formData)

} 
export const getMovieArticle=()=>{
  return api.get("/movies")
}

