import { createContext, useContext, useEffect, useState } from "react";
import { getMovieArticle } from "@/services/movie.api";

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlesLoading, setarticlesLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async (pageNumber = page) => {
    try {
      setarticlesLoading(true);
      const res = await getMovieArticle({ page: pageNumber, limit: 10 });

     setArticles(res.movies);      // array
setPage(res.page);            // number
setTotalPages(res.totalPages);
    } catch (err) {
      setError("Failed to fetch articles");
      setArticles([]);
    } finally {
      setarticlesLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  return (
    <ArticleContext.Provider
      value={{
        articles,
        articlesLoading,
        error,
        page,
        totalPages,
        setPage,
        refetchArticles: fetchArticles,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => useContext(ArticleContext);
