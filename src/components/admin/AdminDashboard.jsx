import { FileText, Eye, Heart, MessageCircle, TrendingUp } from "lucide-react";

const AdminDashboard = ({ articles }) => {
  const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);
  const totalComments = articles.reduce((sum, a) => sum + (a.comments?.length || 0), 0);

  const stats = [
    { label: "Total Articles", value: articles.length, icon: FileText, color: "text-primary" },
    { label: "Total Likes", value: totalLikes, icon: Heart, color: "text-red-500" },
    { label: "Total Comments", value: totalComments, icon: MessageCircle, color: "text-blue-500" },
    { label: "This Month", value: articles.filter(a => {
      const date = new Date(a.date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length, icon: TrendingUp, color: "text-green-500" },
  ];

  const recentArticles = [...articles].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  ).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Recent Articles</h2>
        {recentArticles.length > 0 ? (
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {article.poster ? (
                  <img
                    src={article.poster}
                    alt={article.title}
                    className="w-16 h-20 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-20 bg-muted rounded-md flex items-center justify-center">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.date}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {article.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {article.comments?.length || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No articles yet. Create your first one!</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
