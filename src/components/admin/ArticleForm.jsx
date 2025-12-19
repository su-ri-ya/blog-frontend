import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Loader2 } from "lucide-react";
import { createMovieArticle } from "@/services/movie.api";

const ArticleForm = ({ article }) => {
  const { toast } = useToast();
  const isEditing = !!article;

  const [loading, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState(Date.now());

  const [form, setForm] = useState({
    title: "",
    pov: "",
    posteddate: "",
    poster: null,
    frame1: null,
    frame2: null,
    frame3: null,
  });

  const handleFile = (key, file) => {
    setForm((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, value);
      });

      await createMovieArticle(fd);

      toast({
        title: "Article published",
        description: "Movie article created successfully",
      });

      setForm({
        title: "",
        pov: "",
        posteddate: "",
        poster: null,
        frame1: null,
        frame2: null,
        frame3: null,
      });

      setFileKey(Date.now());
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: err?.response?.data?.message || "Something exploded",
      });
    } finally {
      setLoading(false);
    }
  };

  const ImagePreview = ({ file }) => {
  if (!file) return null;

  const src =
    typeof file === "string" ? file : URL.createObjectURL(file);

  return (
    <img
      src={src}
      className="w-20 h-20 rounded-full object-cover border"
      onLoad={() => typeof file !== "string" && URL.revokeObjectURL(src)}
    />
  );
};

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold">
        {isEditing ? "Edit Movie Article" : "New Movie Article"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-card p-6 rounded-xl border"
      >
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Movie Title</label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* POV */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your POV</label>
          <Textarea
            value={form.pov}
            onChange={(e) => setForm({ ...form, pov: e.target.value })}
            required
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Posted Date</label>
          <Input
            type="date"
            value={form.posteddate}
            onChange={(e) => setForm({ ...form, posteddate: e.target.value })}
            required
          />
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-4">
          {[
            ["poster", "Poster"],
            ["frame1", "Frame 1"],
            ["frame2", "Frame 2"],
            ["frame3", "Frame 3"],
          ].map(([key, label]) => (
            <div key={key} className="space-y-1">
              <label className="text-sm font-medium">{label}</label>
              <ImagePreview file={form[key]} />
              <Input
                key={`${fileKey}-${key}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(key, e.target.files[0])}
                required
              />
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : isEditing ? (
            <>
              <Save className="mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Plus className="mr-2" />
              Publish Article
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ArticleForm;
