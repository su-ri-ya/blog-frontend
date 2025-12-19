const BlogHero = ({ title, description }) => {
  return (
    <div className="text-center py-10 md:py-16">
      <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
        {title}
      </h1>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default BlogHero;
