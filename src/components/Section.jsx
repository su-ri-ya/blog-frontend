const Section = ({ children, className = "" }) => {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
