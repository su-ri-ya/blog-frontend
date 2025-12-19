import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Camera, User } from "lucide-react";
import { updateMe } from "@/services/admin.api";
import { useAuth } from "@/context/AuthContext";

const AdminProfile = () => {
  const { admin, setAdmin } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    avatar: null, // FILE or null
  });

  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name || "",
        bio: admin.bio || "",
        avatar: null, // important
      });
    }
  }, [admin]);

  // preview logic
  const avatarPreview = useMemo(() => {
    if (form.avatar instanceof File) {
      return URL.createObjectURL(form.avatar);
    }
    return admin?.avatar || "";
  }, [form.avatar, admin]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      avatar: file, // FILE, not base64
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("bio", form.bio);

      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      const res = await updateMe(formData);
      setAdmin(res.data.admin);

      toast({
        title: "Profile updated",
        description: "Changes saved successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err?.response?.data?.message || "Something broke",
      });
    }
  };

  if (!admin) return null;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your admin information
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-muted-foreground" />
                )}
              </div>

              <label className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <div>
              <p className="font-medium">{admin.name}</p>
              <p className="text-sm text-muted-foreground">
                {admin.email}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Email (locked) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={admin.email} disabled />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={form.bio}
              onChange={(e) =>
                setForm({ ...form, bio: e.target.value })
              }
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
