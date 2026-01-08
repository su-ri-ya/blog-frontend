import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Trash2,
  Search,
  FileText,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArticlesList = ({
  articles = [],
  page = 1,
  totalPages = 1,
  onNext,
  onPrev,
  onEdit,
  onDelete,
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const safeArticles = Array.isArray(articles) ? articles : [];

  const filteredArticles = safeArticles.filter((a) =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (article) => {
    if (!window.confirm(`Delete "${article.title}"? This is permanent.`))
      return;

    onDelete(article._id || article.id);

    toast({
      title: "Article deleted",
      description: `"${article.title}" has been removed`,
    });
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "—";

  return (
    <div className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">All Articles</h1>
        <p className="text-muted-foreground mt-1">
          Manage your movie reviews
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article._id || article.id}
              className="group bg-card border rounded-xl overflow-hidden transition hover:shadow-lg"
            >
              {article.posterUrl ? (
                <img
                  src={article.posterUrl}
                  alt={article.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition"
                />
              ) : (
                <div className="h-48 bg-muted flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg truncate">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(article.posteddate || article.createdAt)}
                  </p>
                </div>

                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {article.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />{" "}
                    {article.comments?.length || 0}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => onEdit(article)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(article)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-xl bg-card">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No articles found</h3>
          <p className="text-muted-foreground mt-1">
            {searchTerm
              ? "Try a different search term"
              : "Create your first article to get started"}
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={onPrev}
          disabled={page <= 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="flex items-center gap-2 px-4">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={onNext}
          disabled={page >= totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ArticlesList;
