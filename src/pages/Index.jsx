import { useEffect, useRef, useMemo } from "react";
import Header from "@/components/Header";
import Section from "@/components/Section";
import ArticlePreview from "@/components/ArticlePreview";
import BlogHero from "@/components/BlogHero";
import WavyBackground from "@/components/WavyBackground";
import {
  GridContainer,
  GridContent,
  GridWrapper,
} from "@/components/GridContainer";
import { articlesData } from "@/data/articles";

const Index = () => {
  const articlesRef = useRef([]);

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

    articlesRef.current.forEach((article) => {
      if (article) observer.observe(article);
    });

    return () => observer.disconnect();
  }, []);

  // Transform articlesData into the format needed for the article grid
  const allArticles = useMemo(() => {
    return Object.values(articlesData).map((article) => ({
      title: article.title,
      image: article.heroImage,
      publishDate: article.publishDate,
      slug: article.slug,
    }));
  }, []);
  console.log(import.meta.env.VITE_API_URL);


  return (
    <div className="min-h-screen bg-background relative">
      <WavyBackground />
      <Header />

      <Section>
        <GridWrapper>
          <GridContent className="!mt-0 !mb-0">
            <BlogHero
              title="Wallflower"
              description="Exploring the art of cinema, Wallflower brings you thoughtful movie reviews, behind-the-scenes insights, and cinematic stories that spark curiosity and conversation."
            />
          </GridContent>
        </GridWrapper>
      </Section>

      {/* Articles Section - Accordion Grid */}
      <Section>
        <GridWrapper>
          <GridContent>
            <div className="article-full-width">
              <ul className="article-two-columns">
                {allArticles.map((article, index) => (
                  <li
                    key={index}
                    ref={(el) => (articlesRef.current[index] = el)}
                    className="blog-feed__item"
                    style={{
                      animationDelay: `${(index % 2) * 150}ms`,
                    }}
                  >
                    <ArticlePreview
                      title={article.title}
                      slug={article.slug}
                      image={article.image}
                      imageAlt={article.title}
                      publishDate={article.publishDate}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </GridContent>
        </GridWrapper>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="article-grid py-12">
          <div className="article-hero text-center text-sm text-muted-foreground">
            <p>© 2025 Walflower . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
