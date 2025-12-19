import { Facebook, Twitter, Linkedin } from "lucide-react";

export const Article = ({ children }) => {
  return <article className="relative">{children}</article>;
};

export const ArticleContainer = ({ children }) => {
  return <div className="article-grid">{children}</div>;
};

export const ArticleContent = ({ children }) => {
  return (
    <div className="article-content">
      {children}
    </div>
  );
};

export const TopShares = ({ facebookUrl, twitterUrl, linkedinUrl }) => {
  const shareLinks = [
    { icon: Facebook, url: facebookUrl, label: "Facebook" },
    { icon: Twitter, url: twitterUrl, label: "Twitter" },
    { icon: Linkedin, url: linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className="flex gap-4">
      {shareLinks.map(({ icon: Icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-border hover:bg-accent hover:border-primary transition-colors"
          aria-label={`Share on ${label}`}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};
