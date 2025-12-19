import { NavLink, useNavigate } from "react-router-dom";
import { Film, LayoutDashboard, FileText, User, Settings, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "articles", label: "All Articles", icon: FileText },
    { id: "new-article", label: "New Article", icon: Plus },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

 const handleLogout = async () => {
  try {
    await logout();          // updates auth state
    navigate("/login", { replace: true });

    toast({
      title: "Logged out",
      description: "Session ended successfully",
    });
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Logout failed",
      description: err,
    });
  }
};
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Film className="w-6 h-6 text-primary" />
          <span className="text-xl font-serif italic tracking-tight text-foreground">
            CineAdmin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
