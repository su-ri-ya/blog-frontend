import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const ArticleLikes = ({ articleSlug }) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes-${articleSlug}`);
    const userLiked = localStorage.getItem(`liked-${articleSlug}`);
    
    if (storedLikes) setLikes(parseInt(storedLikes, 10));
    if (userLiked === "true") setHasLiked(true);
  }, [articleSlug]);

  const handleLike = () => {
    const newLikes = hasLiked ? likes - 1 : likes + 1;
    const newHasLiked = !hasLiked;
    
    setLikes(newLikes);
    setHasLiked(newHasLiked);
    
    localStorage.setItem(`likes-${articleSlug}`, newLikes.toString());
    localStorage.setItem(`liked-${articleSlug}`, newHasLiked.toString());
  };

  return (
    <button
      onClick={handleLike}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
        hasLiked
          ? "bg-primary/10 border-primary text-primary"
          : "border-border hover:border-primary hover:bg-accent"
      )}
    >
      <Heart
        className={cn(
          "w-5 h-5 transition-all duration-300",
          hasLiked && "fill-primary scale-110"
        )}
      />
      <span className="font-medium">{likes}</span>
    </button>
  );
};
