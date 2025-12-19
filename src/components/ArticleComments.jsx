import { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export const ArticleComments = ({
  articleSlug
}) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    const stored = localStorage.getItem(`comments-${articleSlug}`);
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, [articleSlug]);
  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const newComment = {
      id: Date.now(),
      name: name.trim(),
      content: comment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments-${articleSlug}`, JSON.stringify(updatedComments));
    setName("");
    setComment("");
  };
  return <div className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-accent/30 rounded-2xl border border-border bg-black text-slate-400">
        <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="bg-background" />
        <Textarea placeholder="Write a comment..." value={comment} onChange={e => setComment(e.target.value)} rows={3} className="bg-background resize-none" />
        <Button type="submit" className="gap-2">
          <Send className="w-4 h-4" />
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? <p className="text-muted-foreground text-center py-8">
            No comments yet. Be the first to share your thoughts!
          </p> : comments.map(c => <div key={c.id} className="p-5 bg-card rounded-xl border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{c.name}</span>
                <span className="text-sm text-muted-foreground">{c.date}</span>
              </div>
              <p className="text-foreground/90">{c.content}</p>
            </div>)}
      </div>
    </div>;
};