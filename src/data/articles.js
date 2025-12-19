import articleCover from "@/assets/article-cover.jpg";
import authorMarcus from "@/assets/author-marcus.jpg";
import blog1 from "@/assets/blog-1.avif";
import blog2 from "@/assets/blog-2.avif";
import blog3 from "@/assets/blog-3.avif";
import blog4 from "@/assets/blog-4.avif";
import blog5 from "@/assets/blog-5.avif";
import blog6 from "@/assets/blog-6.avif";
import blog7 from "@/assets/blog-7.avif";
import blog8 from "@/assets/blog-8.avif";
import blog9 from "@/assets/blog-9.avif";
import blog10 from "@/assets/blog-10.avif";
import malmo01 from "@/assets/malmo/malmo-hero.jpg";
import malmo02 from "@/assets/malmo/malmo-02.avif";
import malmo03 from "@/assets/malmo/malmo-03.avif";
import malmo04 from "@/assets/malmo/malmo-04.avif";

// Sample article structure
export const articlesData = {
  "discovering-malmo": {
    slug: "discovering-malmo",
    title: "Discovering Malmö",
    heroImage: malmo01,
    publishDate: "March 15, 2024",
    author: {
      name: "Marcus Chen",
      title: "Travel Writer",
      avatar: authorMarcus,
    },
    content: [
      {
        type: "paragraph",
        content: "Malmö, Sweden's third-largest city, offers a unique blend of Scandinavian charm and modern urban design. From its historic old town to cutting-edge architecture, this coastal gem has become one of Northern Europe's most exciting destinations.",
      },
      {
        type: "heading",
        level: 2,
        content: "A City Reborn",
      },
      {
        type: "paragraph",
        content: "Once an industrial powerhouse, Malmö has transformed itself into a hub of innovation and sustainability. The Western Harbour district showcases this evolution, featuring the iconic Turning Torso skyscraper and eco-friendly residential areas.",
      },
    ],
    galleryImages: [
      { src: malmo02, alt: "Malmö waterfront architecture" },
      { src: malmo03, alt: "Malmö city streets" },
    ],
    relatedArticles: [
      {
        slug: "coastal-adventures",
        title: "Coastal Adventures",
        image: blog2,
      },
    ],
  },
  "coastal-adventures": {
    slug: "coastal-adventures",
    title: "Coastal Adventures",
    heroImage: blog2,
    publishDate: "March 10, 2024",
    author: {
      name: "Marcus Chen",
      title: "Travel Writer",
      avatar: authorMarcus,
    },
    content: [
      {
        type: "paragraph",
        content: "Exploring the rugged coastlines and hidden beaches of Northern Europe.",
      },
    ],
    galleryImages: [
      { src: malmo04, alt: "Coastal scenery" },
      { src: blog3, alt: "Beach adventures" },
    ],
    relatedArticles: [
      {
        slug: "discovering-malmo",
        title: "Discovering Malmö",
        image: malmo01,
      },
    ],
  },
};

export const getArticleBySlug = (slug) => {
  return articlesData[slug];
};
