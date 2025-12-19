import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Save, Palette, Globe, Bell } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "CineReviews",
    siteDescription: "Your trusted movie review platform",
    articlesPerPage: "10",
    enableNotifications: true,
    theme: "system",
  });

  useEffect(() => {
    const saved = localStorage.getItem("adminSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your admin preferences</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* General Settings */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">General</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="siteName" className="text-sm font-medium text-foreground">
                Site Name
              </label>
              <Input
                id="siteName"
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="siteDescription" className="text-sm font-medium text-foreground">
                Site Description
              </label>
              <Input
                id="siteDescription"
                type="text"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="articlesPerPage" className="text-sm font-medium text-foreground">
                Articles Per Page
              </label>
              <Input
                id="articlesPerPage"
                type="number"
                min="5"
                max="50"
                value={settings.articlesPerPage}
                onChange={(e) => setSettings({ ...settings, articlesPerPage: e.target.value })}
              />
            </div>

            <Button type="submit" className="mt-4">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </form>
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">Appearance</h2>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">Theme</label>
            <div className="flex gap-3">
              {["light", "dark", "system"].map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => {
                    setSettings({ ...settings, theme });
                    localStorage.setItem("adminSettings", JSON.stringify({ ...settings, theme }));
                    toast({ title: `Theme set to ${theme}` });
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${
                    settings.theme === theme
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">Notifications</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Enable Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about new comments and likes</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newValue = !settings.enableNotifications;
                setSettings({ ...settings, enableNotifications: newValue });
                localStorage.setItem("adminSettings", JSON.stringify({ ...settings, enableNotifications: newValue }));
                toast({ title: `Notifications ${newValue ? "enabled" : "disabled"}` });
              }}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.enableNotifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.enableNotifications ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
