import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ArticlesList from "@/components/admin/ArticlesList";
import ArticleForm from "@/components/admin/ArticleForm";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminSettings from "@/components/admin/AdminSettings";
import { useAuth } from "../context/AuthContext";
import { getMovieArticle } from "../services/movie.api";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);


  const { admin, loading } = useAuth();


  if (loading) return <div>Loading admin…</div>;
  if (!admin) return <div>NO ADMIN FOUND</div>;


  // Load articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("adminArticles");
    if (saved) {
      const article=getMovieArticle()
      setArticles(article);
    }
  }, []);

  // Save articles to localStorage
  const saveArticles = (newArticles) => {
    setArticles(newArticles);
    localStorage.setItem("adminArticles", JSON.stringify(newArticles));
  };

  const handleSaveArticle = (article) => {
    const existing = articles.find((a) => a.id === article.id);
    if (existing) {
      // Update existing
      saveArticles(articles.map((a) => (a.id === article.id ? article : a)));
    } else {
      // Add new
      saveArticles([article, ...articles]);
    }
    setEditingArticle(null);
    if (activeTab === "articles") {
      // Stay on articles list
    } else {
      setActiveTab("articles");
    }
  };

  const handleDeleteArticle = (id) => {
    saveArticles(articles.filter((a) => a.id !== id));
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setActiveTab("edit-article");
  };

  const renderContent = () => {
    // Handle edit mode
    if (activeTab === "edit-article" && editingArticle) {
      return (
        <ArticleForm
          article={editingArticle}
          onSave={handleSaveArticle}
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
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        );
      case "new-article":
        return <ArticleForm onSave={handleSaveArticle} onCancel={() => setActiveTab("dashboard")} />;
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
