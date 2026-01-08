import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import {
  Article as ArticleWrapper,
  ArticleContainer,
  ArticleContent,
  TopShares,
} from "@/components/ArticleComponents";
import { ArticleLikes } from "@/components/ArticleLikes";
import { ArticleComments } from "@/components/ArticleComments";
import ArticlePreview from "@/components/ArticlePreview";
import Section from "@/components/Section";
import { GridWrapper, GridContent } from "@/components/GridContainer";
import { useArticles } from "@/context/ArticlesContext";

const Article = () => {
  const { id } = useParams();
  const { articles, articlesLoading } = useArticles();

  if (articlesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading article…</p>
      </div>
    );
  }

  const articleData = articles.find((a) => a._id === id);

  if (!articleData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <ArticleWrapper>
        {/* Hero */}
        <section className="article-grid relative py-20">
          <div className="article-hero text-center flex flex-col items-center">

            {/* Back */}
            <div className="w-full mb-4">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition group"
              >
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Back
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-display font-semibold text-[3rem] md:text-[5rem] leading-tight mb-8">
              {articleData.title}
            </h1>

            {/* Author */}
            {articleData.adminId && (
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                  {articleData.adminId.name?.[0]}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{articleData.adminId.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {articleData.adminId.email}
                  </p>
                </div>
              </div>
            )}

            {/* Poster */}
            <div className="w-full aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={articleData.posterUrl}
                alt={articleData.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <ArticleContainer>
          <ArticleContent>
            <time className="block text-sm text-muted-foreground mb-8">
              {articleData.posteddate}
            </time>

            {articleData.pov && <p>{articleData.pov}</p>}

            {/* Frames */}
            {[articleData.frame1Url, articleData.frame2Url, articleData.frame3Url]
              .filter(Boolean)
              .map((src, i) => (
                <figure key={i} className="my-12">
                  <div className="aspect-[16/9] overflow-hidden rounded-xl">
                    <img
                      src={src}
                      alt={`${articleData.title} frame ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </figure>
              ))}
          </ArticleContent>

          {/* Likes & Share */}
          <div className="article-hero mt-16 mb-8 text-center">
            <ArticleLikes articleId={articleData._id} />
            <h3 className="mt-6 font-semibold text-muted-foreground">
              Share This Article
            </h3>
            <TopShares
              facebookUrl={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              twitterUrl={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              linkedinUrl={`https://www.linkedin.com/shareArticle?url=${window.location.href}`}
            />
          </div>

          {/* Comments */}
          <div className="article-content mt-16">
            <ArticleComments articleId={articleData._id} />
          </div>
        </ArticleContainer>
      </ArticleWrapper>

      {/* Related */}
      <Section>
        <GridWrapper>
          <GridContent>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Related Articles
            </h2>

            <div className="max-w-[600px] mx-auto">
              {articles
                .filter((a) => a._id !== articleData._id)
                .slice(0, 1)
                .map((article) => (
                  <ArticlePreview
                    key={article._id}
                    _id={article._id}
                    title={article.title}
                    posterUrl={article.posterUrl}
                  />
                ))}
            </div>
          </GridContent>
        </GridWrapper>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="py-12 text-center text-sm text-muted-foreground">
          © 2025 Wallflower. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Article;
