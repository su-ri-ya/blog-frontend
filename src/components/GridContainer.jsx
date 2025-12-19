export const GridContainer = ({ children, className = "" }) => {
  return (
    <div className={`article-grid ${className}`}>
      {children}
    </div>
  );
};

export const GridWrapper = ({ children, className = "" }) => {
  return (
    <div className={`article-grid ${className}`}>
      {children}
    </div>
  );
};

export const GridContent = ({ children, className = "" }) => {
  return (
    <div className={`article-hero ${className}`}>
      {children}
    </div>
  );
};
