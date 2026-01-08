import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ArticlesList from "@/components/admin/ArticlesList";
import ArticleForm from "@/components/admin/ArticleForm";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminSettings from "@/components/admin/AdminSettings";
import { useAuth } from "../context/AuthContext";
import { useArticles } from "../context/ArticlesContext";
import { deleteMovieArticle } from "@/services/movie.api";
import { Atom, LifeLine } from "react-loading-indicators";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingArticle, setEditingArticle] = useState(null);


  const { admin, loading } = useAuth();
  const {
  articles,
  articlesLoading,
  page,
  totalPages,
  setPage,
  refetchArticles,
} = useArticles();

  console.log(articles);


  if (loading) return <Atom color="#000000" size="medium" text="" textColor="" />
  if (!admin) return <div>NO ADMIN FOUND</div>;
  if (articlesLoading)
  return (
    <div className="flex items-center justify-center min-h-screen">
     <LifeLine color="white" size="medium" text="" textColor="" />
    </div>
  );

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setActiveTab("edit-article");
  };

  const handleDeleteArticle = async (id) => {
    try {
      await deleteMovieArticle(id);
      refetchArticles();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleArticleSaved = () => {
    setEditingArticle(null);
    setActiveTab("articles");
    refetchArticles();
  };

  const renderContent = () => {
    if (activeTab === "edit-article" && editingArticle) {
      return (
        <ArticleForm
          article={editingArticle}
          onSuccess={handleArticleSaved}
          onCancel={() => {
            setEditingArticle(null);
            setActiveTab("articles");
          }}
        />
      );
    }

    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard articles={articles} />;

      case "articles":
        return (
          <ArticlesList
            articles={articles}
            page={page}
            totalPages={totalPages}
            onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
            onPrev={() => setPage((p) => Math.max(p - 1, 1))}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        );

      case "new-article":
        return (
          <ArticleForm
            onSuccess={handleArticleSaved}
            onCancel={() => setActiveTab("dashboard")}
          />
        );

      case "profile":
        return <AdminProfile />;

      case "settings":
        return <AdminSettings />;

      default:
        return <AdminDashboard articles={articles} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
