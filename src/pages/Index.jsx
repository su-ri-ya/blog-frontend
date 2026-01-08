import { useEffect, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Section from "@/components/Section";
import ArticlePreview from "@/components/ArticlePreview";
import BlogHero from "@/components/BlogHero";
import WavyBackground from "@/components/WavyBackground";
import {
  GridContent,
  GridWrapper,
} from "@/components/GridContainer";
import { useArticles } from "@/context/ArticlesContext";

const Index = () => {
  const articlesRef = useRef([]);
  const { articles, articlesLoading } = useArticles();
  console.log(articles);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    articlesRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [articles]);

  return (
    <div className="min-h-screen bg-background relative">
      <WavyBackground />
      <Header />

      {/* Hero */}
      <Section>
        <GridWrapper>
          <GridContent className="!mt-0 !mb-0">
            <BlogHero
              title="Wallflower"
              description="Exploring the art of cinema through thoughtful movie reviews and stories."
            />
          </GridContent>
        </GridWrapper>
      </Section>

      {/* Articles */}
      <Section>
        <GridWrapper>
          <GridContent>
            {articlesLoading ? (
              <p className="text-center text-muted-foreground">
                Loading movies…
              </p>
            ) : (
              <ul className="columns-1 sm:columns-2 lg:columns-2 gap-6">
                {articles.map((article) => (
                  <li
                    key={article._id}
                    className="mb-6 break-inside-avoid"
                  >
                    <ArticlePreview {...article}/>
                  </li>
                ))}
              </ul>
            )}
          </GridContent>
        </GridWrapper>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="py-12 text-center text-sm text-muted-foreground">
          © 2025 Wallflower. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
