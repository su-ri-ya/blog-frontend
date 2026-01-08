import { Link } from "react-router-dom";

const ArticlePreview = ({ _id, title, posterUrl }) => {
  return (
    <Link to={`/articles/${_id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-auto rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Hover title */}
        <div className="absolute inset-0 bg-black/60 opacity-0 
                        group-hover:opacity-100 transition
                        flex items-end">
          <h3 className="p-4 text-white text-lg font-semibold">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ArticlePreview;
