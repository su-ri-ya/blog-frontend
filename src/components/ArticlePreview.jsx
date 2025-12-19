import { Link } from "react-router-dom";

const ArticlePreview = ({ title, slug, image, imageAlt, publishDate }) => {
  return (
    <Link
      to={`/article/${slug}`}
      className="group block"
    >
      <article className="h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden mb-4">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <time className="text-sm text-muted-foreground mb-2">
            {publishDate}
          </time>
          <h3 className="font-display text-2xl md:text-3xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default ArticlePreview;
